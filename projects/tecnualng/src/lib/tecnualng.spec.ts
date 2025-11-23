import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tecnualng } from './tecnualng';

describe('Tecnualng', () => {
  let component: Tecnualng;
  let fixture: ComponentFixture<Tecnualng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tecnualng]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tecnualng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
