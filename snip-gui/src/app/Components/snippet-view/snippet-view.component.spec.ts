import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetViewComponent } from './snippet-view.component';

describe('SnippetViewComponent', () => {
  let component: SnippetViewComponent;
  let fixture: ComponentFixture<SnippetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
