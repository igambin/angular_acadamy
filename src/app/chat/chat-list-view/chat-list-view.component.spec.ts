import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListViewComponent } from './chat-list-view.component';

describe('ChatListViewComponent', () => {
  let component: ChatListViewComponent;
  let fixture: ComponentFixture<ChatListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
