import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvViewModelComponent } from './cv-view-model.component';

describe('CvViewModelComponent', () => {
  let component: CvViewModelComponent;
  let fixture: ComponentFixture<CvViewModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvViewModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
