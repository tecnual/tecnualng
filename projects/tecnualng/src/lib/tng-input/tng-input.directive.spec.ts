import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { TngInputDirective } from './tng-input.directive';

@Component({
  template: `<input type="text" tngInput [formControl]="control">`,
  imports: [TngInputDirective, ReactiveFormsModule]
})
class TestHostComponent {
  control = new FormControl('');
  @ViewChild(TngInputDirective) directive!: TngInputDirective;
}

describe('TngInputDirective', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent.directive).toBeTruthy();
  });

  it('should update hasValue when control value changes programmatically', async () => {
    expect(hostComponent.directive.hasValue()).toBeFalse();
    
    hostComponent.control.setValue('new value');
    // Ensure DOM is updated
    fixture.detectChanges(); 
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    // console.log('Input value in DOM:', input.value);
    // console.log('Directive signal value:', hostComponent.directive['hasValue']());

    expect(hostComponent.directive.hasValue()).toBeTrue();
  });
});
