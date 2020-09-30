import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordViewComponent } from './password-view.component';

describe('PasswordViewComponent', () => {
  let component: PasswordViewComponent;
  let fixture: ComponentFixture<PasswordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
