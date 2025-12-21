import {
  Directive,
  ElementRef,
  HostListener,
  signal,
  computed,
  inject,
  input,
  effect,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
  model,
  AfterViewInit,
  HostBinding,
  booleanAttribute,
  OnInit,
  DestroyRef,
  untracked
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { TngSelectPanelComponent } from './tng-select-panel.component';

export interface SelectOption {
  value: any;
  label: string;
  html?: string;
  disabled?: boolean;
  group?: string;
  index?: number;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

export type PanelItem = 
  | { type: 'header', label: string, disabled?: boolean }
  | { type: 'option', option: SelectOption };


@Directive({
  selector: 'select[tngSelect]',
  standalone: true,
  host: {
    '[class.tng-select]': 'true',
    '[class.tng-select-multi]': 'isMulti()',
    '[class.tng-select-search]': 'enableSearch()',
    '[class.tng-select-open]': 'isOpen()',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-multiselectable]': 'isMulti()'
  }
})
export class TngSelectDirective implements AfterViewInit, OnDestroy, OnInit {
  private el = inject(ElementRef<HTMLSelectElement>);
  private viewContainerRef = inject(ViewContainerRef);
  public ngControl = inject(NgControl, { optional: true, self: true });
  private destroyRef = inject(DestroyRef);

  // Inputs
  enableMulti = input<boolean>(false);
  // Support native multiple attribute
  multiple = input(false, { transform: booleanAttribute });
  
  enableSearch = input<boolean>(false);
  placeholder = input<string>('Select an option');

  customTrigger = input<boolean>(false);
  triggerRef = input<HTMLElement | undefined>(undefined);

  // Model for two-way binding
  selectedValues = model<any[]>([]);

  // State signals
  isOpen = signal(false);
  searchQuery = signal('');
  private _options = signal<SelectOption[]>([]);
  private _groups = signal<SelectGroup[]>([]); // Store structural representation if needed
  private _selectedIndices = signal<number[]>([], { equal: (a, b) => {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
  }});

  // Component reference for the panel
  private panelRef: ComponentRef<TngSelectPanelComponent> | null = null;
  
  // Generated trigger element
  private triggerEl: HTMLElement | null = null;
  
  // Disabled state tracking
  private isDisabled = signal(false);
  private mutationObserver: MutationObserver | null = null;

  // Computed
  isMulti = computed(() => this.enableMulti() || this.multiple());

  options = computed(() => this._options());
  
  filteredItems = computed<PanelItem[]>(() => {
    const query = this.searchQuery().toLowerCase();
    const opts = this._options();
    const showAll = !query || !this.enableSearch();
    
    const items: PanelItem[] = [];
    let currentGroup: string | undefined = undefined;
    
    // We rebuild the structure from the flat list which has group info
    // This assumes options are sorted by group as they come from DOM
    
    // Better approach: track groups and filter
    const grouped: { [key: string]: SelectOption[] } = {};
    const ungrouped: SelectOption[] = [];
    
    // 1. Organize
    opts.forEach(opt => {
      if (opt.group) {
        if (!grouped[opt.group]) grouped[opt.group] = [];
        grouped[opt.group].push(opt);
      } else {
        ungrouped.push(opt);
      }
    });
    
    // 2. Filter and Build Items
    
    // Ungrouped first (or mapped by original order? strict DOM order is better)
    // To maintain DOM order, we should just iterate opts.
    
    let lastGroup: string | undefined = undefined;
    
    opts.forEach(opt => {
      // Filter check
      const matches = showAll || opt.label.toLowerCase().includes(query);
      if (!matches) return;

      // Group Header Handling
      if (opt.group !== lastGroup) {
         if (opt.group) {
             items.push({ type: 'header', label: opt.group });
         }
         lastGroup = opt.group;
      }
      
      items.push({ type: 'option', option: opt });
    });
    
    return items;
  });

  filteredOptions = computed(() => this._options()); // Legacy support if needed, or remove?
  // Panel expects items now. We will need to update panel interaction.


  selectedOptions = computed(() => {
    const indices = this._selectedIndices();
    const opts = this._options();
    return indices.map(idx => opts[idx]).filter(Boolean);
  });

  displayText = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) {
      return this.placeholder();
    }
    return selected.map(opt => opt.label).join(', ');
  });

  constructor() {
    // Sync selected values with model (Output)
    effect(() => {
      const selected = this.selectedOptions();
      // Use untracked to avoid loop if selectedValues write triggers immediate read dependency? No.
      this.selectedValues.set(selected.map(opt => opt.value));
    });

    // Sync model with internal (Input)
    effect(() => {
        const values = this.selectedValues();
        // Avoid infinite loop by checking if values actally represent a change
        const currentSelected = untracked(() => this.selectedOptions());
        const currentValues = currentSelected.map(o => o.value);
        
        // Simple equality check (value-based)
        if (values.length !== currentValues.length || !values.every((v, i) => v == currentValues[i])) { // weak eq
            this.updateSelectionFromValue(values);
        }
    });

    // Update form control value
    effect(() => {
      if (this.ngControl?.control) {
        const values = this.selectedValues();
        const newValue = this.isMulti() ? values : (values[0] ?? null);
        // Only setValue if changed? internal control handles checks usually
        // Use emitEvent: false to prevent circular loop back to updating internal model
        this.ngControl.control.setValue(newValue, { emitEvent: false });
      }
    });

    // Observe childList changes to update options if DOM changes
    effect((onCleanup) => {
        const observer = new MutationObserver(() => {
            this.loadOptionsFromSelect();
        });
        observer.observe(this.el.nativeElement, { childList: true, subtree: true });
        onCleanup(() => observer.disconnect());
    });

    // Update generated trigger text and state
    effect(() => {
      if (this.triggerEl) {
        const textSpan = this.triggerEl.querySelector('.tng-select-display-text');
        if (textSpan) {
          textSpan.textContent = this.displayText();
        }

        // Toggle open class
        if (this.isOpen()) {
          this.triggerEl.classList.add('tng-select-open');
        } else {
          this.triggerEl.classList.remove('tng-select-open');
        }
        
        // Toggle disabled class
        if (this.isDisabled()) {
          this.triggerEl.classList.add('disabled');
        } else {
          this.triggerEl.classList.remove('disabled');
        }
      }
    });
  }

  ngOnInit() {
    if (this.ngControl) {
      this.ngControl.valueChanges?.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((val) => {
        // Find indices matching value
        this.updateSelectionFromValue(val);
      });
    }
  }

  private updateSelectionFromValue(value: any) {
    const opts = this._options();
    const indices: number[] = [];
    
    if (this.isMulti()) {
      const valArray = Array.isArray(value) ? value : (value ? [value] : []);
      valArray.forEach((v: any) => {
        const idx = opts.findIndex(o => o.value == v); // weak equality for numbers/strings?
        if (idx !== -1) indices.push(idx);
      });
    } else {
      const idx = opts.findIndex(o => o.value == value);
      if (idx !== -1) indices.push(idx);
    }
    
    this._selectedIndices.set(indices);
    this.updateNativeSelect(false);
  }

  ngAfterViewInit() {
    this.loadOptionsFromSelect();
    this.loadInitialSelection();
    
    // Hide the native select visually but keep it in the DOM for forms
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.pointerEvents = 'none';
    this.el.nativeElement.style.height = '0';
    this.el.nativeElement.style.width = '0';

    
    // Track disabled state
    this.isDisabled.set(this.el.nativeElement.disabled);
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'disabled') {
          this.isDisabled.set(this.el.nativeElement.disabled);
        }
      });
    });
    this.mutationObserver.observe(this.el.nativeElement, { attributes: true });

    // Initial load
    this.loadOptionsFromSelect();


    if (!this.customTrigger()) {
      this.createTrigger();
    }
  }

  ngOnDestroy() {
    this.closePanel();
    if (this.triggerEl) {
      this.triggerEl.remove();
      this.triggerEl = null;
    }
    this.mutationObserver?.disconnect();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // If we have a generated trigger, the click is handled there.
    // If we have a custom trigger (parent component), it handles the click.
    // But if the user somehow clicks the hidden select (label for?), we should toggle.
    event.preventDefault();
    event.stopPropagation();
    this.togglePanel();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.togglePanel();
    } else if (event.key === 'Escape') {
      this.closePanel();
    }
  }

  private createTrigger() {
    const trigger = document.createElement('div');
    trigger.className = 'tng-select-display';
    
    const text = document.createElement('span');
    text.className = 'tng-select-display-text';
    text.textContent = this.displayText();
    
    const arrow = document.createElement('i');
    arrow.className = 'fa fa-chevron-down tng-select-arrow';
    
    trigger.appendChild(text);
    trigger.appendChild(arrow);
    
    trigger.addEventListener('click', (e) => {
      if (this.isDisabled()) return;
      e.preventDefault();
      e.stopPropagation();
      this.togglePanel();
    });
    
    // Insert after select
    const parent = this.el.nativeElement.parentNode;
    if (parent) {
      parent.insertBefore(trigger, this.el.nativeElement.nextSibling);
    }
    
    this.triggerEl = trigger;
  }

  private loadOptionsFromSelect() {
    const selectEl = this.el.nativeElement;
    const options: SelectOption[] = [];
    let globalIndex = 0;
    
    const children = Array.from(selectEl.children) as HTMLElement[];
    
    children.forEach(child => {
      if (child.tagName === 'OPTGROUP') {
        const groupLabel = (child as HTMLOptGroupElement).label;
        const groupDisabled = (child as HTMLOptGroupElement).disabled;
        const groupOptions = Array.from(child.children) as HTMLOptionElement[];
        
        groupOptions.forEach(optNode => {
          if (optNode.tagName === 'OPTION') {
             const opt = optNode as HTMLOptionElement;
             options.push({
               value: opt.value,
               label: opt.text,
               html: opt.innerHTML, // Capture inner HTML
               disabled: opt.disabled || groupDisabled,
               group: groupLabel,
               index: globalIndex++
             });
          }
        });
      } else if (child.tagName === 'OPTION') {
        const opt = child as HTMLOptionElement;
        options.push({
          value: opt.value,
          label: opt.text,
          html: opt.innerHTML,
          disabled: opt.disabled,
          index: globalIndex++
        });
      }
    });
    
    this._options.set(options);
  }

  private loadInitialSelection() {
    const selectEl = this.el.nativeElement;
    const selectedIndices: number[] = [];
    
    if (this.isMulti()) {
      for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].selected) {
          selectedIndices.push(i);
        }
      }
    } else {
      if (selectEl.selectedIndex >= 0) {
        selectedIndices.push(selectEl.selectedIndex);
      }
    }
    
    this._selectedIndices.set(selectedIndices);
  }

  public togglePanel() {
    if (this.isOpen()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  private openPanel() {
    if (this.panelRef) {
      return;
    }

    this.isOpen.set(true);
    
    // Create the panel component
    this.panelRef = this.viewContainerRef.createComponent(TngSelectPanelComponent);
    
    // Configure the panel
    this.panelRef.instance.items.set(this.filteredItems());

    this.panelRef.instance.selectedIndices.set(this._selectedIndices());
    this.panelRef.instance.enableMulti.set(this.isMulti());
    this.panelRef.instance.enableSearch.set(this.enableSearch());
    this.panelRef.instance.searchQuery.set(this.searchQuery());
    
    // Position the panel
    this.positionPanel();
    
    // Listen to panel events
    const sub1 = this.panelRef.instance.optionSelected.subscribe((index: number) => {
      this.onOptionSelected(index);
    });
    
    const sub2 = this.panelRef.instance.searchQueryChanged.subscribe((query: string) => {
      this.searchQuery.set(query);
      // Update filtered options in the panel
      this.panelRef!.instance.items.set(this.filteredItems());

    });
    
    const sub3 = this.panelRef.instance.closeRequested.subscribe(() => {
      this.closePanel();
    });
    
    // Store subscriptions for cleanup
    (this.panelRef.instance as any)._subscriptions = [sub1, sub2, sub3];
    
    // Add click outside listener
    setTimeout(() => {
      document.addEventListener('click', this.onDocumentClick);
    }, 0);
  }

  private closePanel() {
    if (!this.panelRef) {
      return;
    }

    this.isOpen.set(false);
    
    // Cleanup subscriptions
    const subs = (this.panelRef.instance as any)._subscriptions || [];
    subs.forEach((sub: any) => sub.unsubscribe());
    
    // Destroy the panel
    this.panelRef.destroy();
    this.panelRef = null;
    
    // Remove click outside listener
    document.removeEventListener('click', this.onDocumentClick);
    
    // Reset search
    this.searchQuery.set('');
  }

  private positionPanel() {
    if (!this.panelRef) {
      return;
    }

    // Use provided trigger ref, or generated trigger, or fallback to select element
    const anchor = this.triggerRef() || this.triggerEl || this.el.nativeElement;
    const panelEl = this.panelRef.location.nativeElement;
    
    // Calculate position relative to offset parent to support scrolling
    const offsetParent = anchor.offsetParent as HTMLElement || document.body;
    const anchorRect = anchor.getBoundingClientRect();
    const parentRect = offsetParent.getBoundingClientRect();
    
    const top = anchorRect.bottom - parentRect.top;
    const left = anchorRect.left - parentRect.left;
    
    panelEl.style.position = 'absolute';
    panelEl.style.top = `${top + 4}px`;
    panelEl.style.left = `${left}px`;
    panelEl.style.width = `${anchorRect.width}px`;
    panelEl.style.zIndex = '1000';
  }

  private onOptionSelected(index: number) {
    const currentIndices = [...this._selectedIndices()];
    
    if (this.isMulti()) {
      // Toggle selection in multi mode
      const idx = currentIndices.indexOf(index);
      if (idx >= 0) {
        currentIndices.splice(idx, 1);
      } else {
        currentIndices.push(index);
      }
      this._selectedIndices.set(currentIndices);
      
      // Update panel selection
      if (this.panelRef) {
        this.panelRef.instance.selectedIndices.set(currentIndices);
      }
    } else {
      // Single selection mode
      this._selectedIndices.set([index]);
      this.closePanel();
    }
    
    // Update native select
    this.updateNativeSelect();
  }

  private updateNativeSelect(emitEvents = true) {
    const selectEl = this.el.nativeElement;
    const selectedIndices = this._selectedIndices();
    
    // Clear all selections
    for (let i = 0; i < selectEl.options.length; i++) {
      selectEl.options[i].selected = false;
    }
    
    // Set new selections
    selectedIndices.forEach(idx => {
      if (selectEl.options[idx]) {
        selectEl.options[idx].selected = true;
      }
    });

    if (emitEvents) {
      // Trigger change event
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      // Also trigger input event for some frameworks
      selectEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  private onDocumentClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const selectEl = this.el.nativeElement;
    const panelEl = this.panelRef?.location.nativeElement;
    const triggerEl = this.triggerEl;
    const triggerRef = this.triggerRef();
    
    if (!selectEl.contains(target) && 
        !panelEl?.contains(target) && 
        !triggerEl?.contains(target) &&
        !triggerRef?.contains(target)) {
      this.closePanel();
    }
  };
}
