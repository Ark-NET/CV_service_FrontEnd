import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvEditModelComponent } from './cv-edit-model.component';

describe('CvEditModelComponent', () => {
  let component: CvEditModelComponent;
  let fixture: ComponentFixture<CvEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvEditModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
