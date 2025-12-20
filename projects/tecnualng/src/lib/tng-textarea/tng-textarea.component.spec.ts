import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TngTextareaComponent } from './tng-textarea.component';
import { TngFormFieldComponent } from '../tng-form-field/tng-form-field.component';

@Component({
  template: `<tng-textarea [formControl]="control"></tng-textarea>`,
  imports: [TngTextareaComponent, ReactiveFormsModule]
})
class TestHostComponent {
  control = new FormControl('');
}

describe('TngTextareaComponent', () => {
  let hostComponent: TestHostComponent;
  let component: TngTextareaComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    
    // Get the actual component instance from the host
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync value from control to component', () => {
    hostComponent.control.setValue('new value');
    fixture.detectChanges();
    expect(component.value()).toBe('new value');
  });

  it('should sync value from component to control', () => {
    const newValue = 'user input';
    const textareaElement = fixture.nativeElement.querySelector('textarea');
    textareaElement.value = newValue;
    textareaElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(hostComponent.control.value).toBe(newValue);
  });

  it('should handle disabled state', () => {
    hostComponent.control.disable();
    fixture.detectChanges();
    expect(component.disabled()).toBeTrue();

    hostComponent.control.enable();
    fixture.detectChanges();
    expect(component.disabled()).toBeFalse();
  });

  it('should handle null/undefined writeValue', () => {
    component.writeValue(null);
    expect(component.value()).toBe('');
    
    component.writeValue(undefined);
    expect(component.value()).toBe('');
  });
});
