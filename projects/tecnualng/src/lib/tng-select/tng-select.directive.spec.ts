import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TngSelectDirective, SelectOption } from './tng-select.directive';
import { TngSelectPanelComponent } from './tng-select-panel.component';

@Component({
  standalone: true,
  imports: [TngSelectDirective, FormsModule],
  template: `
    <select 
      tngSelect
      [enableMulti]="enableMulti()"
      [enableSearch]="enableSearch()"
      [(selectedValues)]="selectedValues"
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
  `
})
class TestHostComponent {
  enableMulti = signal(false);
  enableSearch = signal(false);
  selectedValues: any[] = [];
}

@Component({
  standalone: true,
  imports: [TngSelectDirective, ReactiveFormsModule],
  template: `
    <select 
      tngSelect
      [enableMulti]="enableMulti"
      [formControl]="control"
    >
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </select>
  `
})
class TestReactiveFormComponent {
  enableMulti = false;
  control = new FormControl<any>(null);
}

describe('TngSelectDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let selectElement: HTMLSelectElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TngSelectPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    selectElement = fixture.nativeElement.querySelector('select');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(selectElement).toBeTruthy();
  });

  it('should apply tng-select class', () => {
    expect(selectElement.classList.contains('tng-select')).toBe(true);
  });

  it('should load options from select element', () => {
    const directive = fixture.debugElement.query(
      (el) => el.nativeElement === selectElement
    ).injector.get(TngSelectDirective);
    
    expect(directive.options().length).toBe(3);
    expect(directive.options()[0].label).toBe('Option 1');
    expect(directive.options()[0].value).toBe('1');
  });

  it('should toggle panel on click', () => {
    const directive = fixture.debugElement.query(
      (el) => el.nativeElement === selectElement
    ).injector.get(TngSelectDirective);

    expect(directive.isOpen()).toBe(false);
    
    selectElement.click();
    fixture.detectChanges();
    
    expect(directive.isOpen()).toBe(true);
  });

  it('should apply multi-select class when enableMulti is true', () => {
    component.enableMulti.set(true);
    fixture.detectChanges();
    
    expect(selectElement.classList.contains('tng-select-multi')).toBe(true);
  });

  it('should apply search class when enableSearch is true', () => {
    component.enableSearch.set(true);
    fixture.detectChanges();
    
    expect(selectElement.classList.contains('tng-select-search')).toBe(true);
  });

  it('should set ARIA attributes', () => {
    expect(selectElement.getAttribute('aria-haspopup')).toBe('listbox');
    expect(selectElement.getAttribute('aria-expanded')).toBe('false');
  });

  it('should update ARIA expanded when panel opens', () => {
    selectElement.click();
    fixture.detectChanges();
    
    expect(selectElement.getAttribute('aria-expanded')).toBe('true');
  });

  it('should handle keyboard navigation', () => {
    const directive = fixture.debugElement.query(
      (el) => el.nativeElement === selectElement
    ).injector.get(TngSelectDirective);

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    selectElement.dispatchEvent(enterEvent);
    fixture.detectChanges();
    
    expect(directive.isOpen()).toBe(true);
    
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    selectElement.dispatchEvent(escapeEvent);
    fixture.detectChanges();
    
    expect(directive.isOpen()).toBe(false);
  });

  describe('Single Selection Mode', () => {
    it('should select single option', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      selectElement.click();
      fixture.detectChanges();

      // Simulate option selection
      directive['onOptionSelected'](1);
      fixture.detectChanges();

      expect(component.selectedValues).toEqual(['2']);
      expect(directive.isOpen()).toBe(false); // Should close after selection
    });

    it('should update display text with selected option', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      directive['onOptionSelected'](0);
      fixture.detectChanges();

      expect(directive.displayText()).toBe('Option 1');
    });
  });

  describe('Multi Selection Mode', () => {
    beforeEach(() => {
      component.enableMulti.set(true);
      fixture.detectChanges();
    });

    it('should select multiple options', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      selectElement.click();
      fixture.detectChanges();

      directive['onOptionSelected'](0);
      directive['onOptionSelected'](2);
      fixture.detectChanges();

      expect(component.selectedValues).toEqual(['1', '3']);
      expect(directive.isOpen()).toBe(true); // Should stay open
    });

    it('should toggle selection in multi mode', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      directive['onOptionSelected'](0);
      fixture.detectChanges();
      expect(component.selectedValues).toEqual(['1']);

      directive['onOptionSelected'](0);
      fixture.detectChanges();
      expect(component.selectedValues).toEqual([]);
    });

    it('should display comma-separated labels', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      directive['onOptionSelected'](0);
      directive['onOptionSelected'](1);
      fixture.detectChanges();

      expect(directive.displayText()).toBe('Option 1, Option 2');
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      component.enableSearch.set(true);
      fixture.detectChanges();
    });

    it('should filter options based on search query', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      directive.searchQuery.set('option 1');
      fixture.detectChanges();

      const filtered = directive.filteredItems();
      expect(filtered.length).toBe(1);
      expect(filtered[0].type).toBe('option');
      if (filtered[0].type === 'option') {
        expect(filtered[0].option.label).toBe('Option 1');
      }
    });

    it('should be case-insensitive', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      directive.searchQuery.set('OPTION');
      fixture.detectChanges();

      expect(directive.filteredItems().length).toBe(3);
    });

    it('should reset search query when panel closes', () => {
      const directive = fixture.debugElement.query(
        (el) => el.nativeElement === selectElement
      ).injector.get(TngSelectDirective);

      selectElement.click();
      directive.searchQuery.set('test');
      fixture.detectChanges();

      directive['closePanel']();
      fixture.detectChanges();

      expect(directive.searchQuery()).toBe('');
    });
  });

  describe('Reactive Forms Integration', () => {
    let reactiveFixture: ComponentFixture<TestReactiveFormComponent>;
    let reactiveComponent: TestReactiveFormComponent;

    beforeEach(async () => {
      reactiveFixture = TestBed.createComponent(TestReactiveFormComponent);
      reactiveComponent = reactiveFixture.componentInstance;
      reactiveFixture.detectChanges();
    });

    it('should work with FormControl', () => {
      const select = reactiveFixture.nativeElement.querySelector('select');
      const directive = reactiveFixture.debugElement.query(
        (el) => el.nativeElement === select
      ).injector.get(TngSelectDirective);

      directive['onOptionSelected'](0);
      reactiveFixture.detectChanges();

      expect(reactiveComponent.control.value).toBe('a');
    });

    it('should update when FormControl value changes', () => {
      reactiveComponent.control.setValue('b');
      reactiveFixture.detectChanges();

      const select = reactiveFixture.nativeElement.querySelector('select');
      expect(select.value).toBe('b');

      const directive = reactiveFixture.debugElement.query(
        (el) => el.nativeElement === select
      ).injector.get(TngSelectDirective);
      expect(directive.displayText()).toBe('Option B');
    });

    it('should handle multi-select with FormControl', () => {
      reactiveComponent.enableMulti = true;
      reactiveFixture.detectChanges(); // Propagate input change to directive

      reactiveComponent.control.setValue(['a', 'c']);
      reactiveFixture.detectChanges();

      const directive = reactiveFixture.debugElement.query(
        (el) => el.nativeElement === reactiveFixture.nativeElement.querySelector('select')
      ).injector.get(TngSelectDirective);

      expect(directive.selectedValues()).toEqual(['a', 'c']);
    });
  });
  });

  describe('Grouping', () => {
    it('should parse optgroups', () => {
      // Create a select with optgroups manually since dynamic template is hard in test host
      const hostFixture = TestBed.createComponent(TestHostComponent);
      const hostComp = hostFixture.componentInstance;
      const select = hostFixture.nativeElement.querySelector('select');
      
      // Clear existing
      select.innerHTML = '';
      
      const group = document.createElement('optgroup');
      group.label = 'Group A';
      
      const opt1 = document.createElement('option');
      opt1.value = 'g1';
      opt1.text = 'Grouped 1';
      
      group.appendChild(opt1);
      select.appendChild(group);
      
      const opt2 = document.createElement('option');
      opt2.value = 'u1';
      opt2.text = 'Ungrouped';
      select.appendChild(opt2);
      
      hostFixture.detectChanges();
      
      const directive = hostFixture.debugElement.query(
        (el) => el.nativeElement === select
      ).injector.get(TngSelectDirective);
      
      // Force reload options as MutationObserver specific behavior might rely on async
      directive['loadOptionsFromSelect']();
      
      const opts = directive.options();
      expect(opts.length).toBe(2);
      expect(opts[0].group).toBe('Group A');
      expect(opts[0].label).toBe('Grouped 1');
      expect(opts[1].group).toBeUndefined();
      
      // Check Items structure
      const items = directive.filteredItems();
      // Should have Header, Option, Option
      expect(items.length).toBe(3);
      expect(items[0].type).toBe('header');
      expect(items[0].label).toBe('Group A');
      expect(items[1].type).toBe('option');
      expect(items[2].type).toBe('option');
    });
  });
});
