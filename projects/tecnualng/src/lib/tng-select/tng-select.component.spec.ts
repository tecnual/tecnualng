import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TngSelectComponent } from './tng-select.component';
import { SelectOption } from './tng-select.directive';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'tng-select-host',
  standalone: true,
  imports: [TngSelectComponent, ReactiveFormsModule, CommonModule],
  template: `
    <tng-select 
      [formControl]="control" 
      [options]="options"
      [enableMulti]="enableMulti">
    </tng-select>
    <div>Values: {{ control.value | json }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TngSelectTestHost {
  control = new FormControl<any>(null);
  options: SelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ];
  enableMulti = false;
}

describe('TngSelectComponent', () => {
  let hostComponent: TngSelectTestHost;
  let fixture: ComponentFixture<TngSelectTestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TngSelectTestHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TngSelectTestHost);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should respond to setValue', () => {
    hostComponent.control.setValue('1');
    fixture.detectChanges();
    
    // Check component value signal
    const selectComponent = fixture.debugElement.children[0].componentInstance as TngSelectComponent;
    expect(selectComponent.value()).toEqual(['1']);
    expect(selectComponent.displayText()).toBe('Option 1');
  });

  it('should not error with NG0100 when setting value initially', () => {
    // This test simulates initialization scenario.
    // If we had NG0100, Angular would log error (and maybe fail if strict?).
    // We can rely on console spy or just passing without error.
    hostComponent.control.setValue('2');
    fixture.detectChanges();
    expect(hostComponent.control.value).toBe('2');
  });

  it('should propagate user selection to control via onSelectionChange', () => {
    const selectComponent = fixture.debugElement.children[0].componentInstance as TngSelectComponent;
    
    // Simulate selection from directive
    selectComponent.onSelectionChange(['2']);
    fixture.detectChanges();

    expect(hostComponent.control.value).toBe('2');
    expect(selectComponent.value()).toEqual(['2']);
  });
});
