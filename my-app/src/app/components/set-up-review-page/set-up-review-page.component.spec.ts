import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpReviewPageComponent } from './set-up-review-page.component';

describe('SetUpReviewPageComponent', () => {
  let component: SetUpReviewPageComponent;
  let fixture: ComponentFixture<SetUpReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetUpReviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetUpReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
