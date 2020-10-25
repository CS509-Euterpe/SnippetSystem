import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetPanelComponent } from './snippet-panel.component';

describe('SnippetPanelComponent', () => {
  let component: SnippetPanelComponent;
  let fixture: ComponentFixture<SnippetPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
