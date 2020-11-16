import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCommentsPanelComponent } from './no-comments-panel.component';

describe('NoCommentsPanelComponent', () => {
  let component: NoCommentsPanelComponent;
  let fixture: ComponentFixture<NoCommentsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoCommentsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCommentsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
