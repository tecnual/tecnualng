import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngButton } from './tng-button';

describe('TngButton', () => {
  let component: TngButton;
  let fixture: ComponentFixture<TngButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TngButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TngButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
