import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngBreadcrumbsComponent } from './tng-breadcrumbs.component';

describe('TngBreadcrumbsComponent', () => {
  let component: TngBreadcrumbsComponent;
  let fixture: ComponentFixture<TngBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TngBreadcrumbsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TngBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
