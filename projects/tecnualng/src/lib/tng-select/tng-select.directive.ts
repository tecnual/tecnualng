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
  booleanAttribute
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { TngSelectPanelComponent } from './tng-select-panel.component';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

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
export class TngSelectDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLSelectElement>);
  private viewContainerRef = inject(ViewContainerRef);
  public ngControl = inject(NgControl, { optional: true, self: true });

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
  private _selectedIndices = signal<number[]>([]);

  // Component reference for the panel
  private panelRef: ComponentRef<TngSelectPanelComponent> | null = null;
  
  // Generated trigger element
  private triggerEl: HTMLElement | null = null;

  // Computed
  isMulti = computed(() => this.enableMulti() || this.multiple());

  options = computed(() => this._options());
  
  filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const opts = this._options();
    
    if (!query || !this.enableSearch()) {
      return opts;
    }
    
    return opts.filter(opt => 
      opt.label.toLowerCase().includes(query)
    );
  });

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
    // Sync selected values with model
    effect(() => {
      const selected = this.selectedOptions();
      this.selectedValues.set(selected.map(opt => opt.value));
    });

    // Update form control value
    effect(() => {
      if (this.ngControl?.control) {
        const values = this.selectedValues();
        const newValue = this.isMulti() ? values : (values[0] ?? null);
        this.ngControl.control.setValue(newValue, { emitEvent: false });
      }
    });

    // Update generated trigger text
    effect(() => {
      if (this.triggerEl) {
        const textSpan = this.triggerEl.querySelector('.tng-select-trigger-text');
        if (textSpan) {
          textSpan.textContent = this.displayText();
        }
      }
    });
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

    if (!this.customTrigger()) {
      this.createTrigger();
    }
  }

  ngOnDestroy() {
    this.closePanel();
    if (this.triggerEl) {
      this.triggerEl.remove();
    }
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
    trigger.className = 'tng-select-trigger';
    trigger.style.display = 'flex';
    trigger.style.alignItems = 'center';
    trigger.style.justifyContent = 'space-between';
    trigger.style.padding = '0.75rem 1rem';
    trigger.style.border = '1px solid #ccc';
    trigger.style.borderRadius = '4px';
    trigger.style.background = '#fff';
    trigger.style.cursor = 'pointer';
    trigger.style.minHeight = '48px';
    trigger.style.boxSizing = 'border-box';
    
    const text = document.createElement('span');
    text.className = 'tng-select-trigger-text';
    text.textContent = this.displayText();
    text.style.flex = '1';
    text.style.overflow = 'hidden';
    text.style.textOverflow = 'ellipsis';
    text.style.whiteSpace = 'nowrap';
    
    const arrow = document.createElement('span');
    arrow.innerHTML = '&#9662;'; // Down arrow
    arrow.style.marginLeft = '0.5rem';
    
    trigger.appendChild(text);
    trigger.appendChild(arrow);
    
    trigger.addEventListener('click', (e) => {
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
    
    for (let i = 0; i < selectEl.options.length; i++) {
      const option = selectEl.options[i];
      options.push({
        value: option.value,
        label: option.text,
        disabled: option.disabled
      });
    }
    
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
    this.panelRef.instance.options.set(this.filteredOptions());
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
      this.panelRef!.instance.options.set(this.filteredOptions());
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

  private updateNativeSelect() {
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
    
    // Trigger change event
    selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    // Also trigger input event for some frameworks
    selectEl.dispatchEvent(new Event('input', { bubbles: true }));
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
