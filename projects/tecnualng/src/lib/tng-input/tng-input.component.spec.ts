import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TecnualInputComponent } from './tng-input.component';

@Component({
  template: `<tng-input [formControl]="control"></tng-input>`,
  imports: [TecnualInputComponent, ReactiveFormsModule]
})
class TestHostComponent {
  control = new FormControl('');
}

describe('TecnualInputComponent', () => {
  let hostComponent: TestHostComponent;
  let component: TecnualInputComponent;
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
    expect(component.hasValue()).toBeTrue();
  });

  it('should sync value from component to control', () => {
    const newValue = 'user input';
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = newValue;
    inputElement.dispatchEvent(new Event('input'));
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

  it('should update focus state', () => {
     component.onFocus();
     expect(component.isFocused()).toBeTrue();

     component.onBlur();
     expect(component.isFocused()).toBeFalse();
  });
});
