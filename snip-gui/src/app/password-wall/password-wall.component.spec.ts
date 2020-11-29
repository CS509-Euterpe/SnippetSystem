import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordWallComponent } from './password-wall.component';

describe('PasswordWallComponent', () => {
  let component: PasswordWallComponent;
  let fixture: ComponentFixture<PasswordWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
