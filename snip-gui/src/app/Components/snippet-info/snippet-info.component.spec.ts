import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetInfoComponent } from './snippet-info.component';

describe('SnippetInfoComponent', () => {
  let component: SnippetInfoComponent;
  let fixture: ComponentFixture<SnippetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
