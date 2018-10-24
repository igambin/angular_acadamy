import {AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Message} from '../models/message';

@Component({
  selector: 'jc-chat-list-view',
  templateUrl: './chat-list-view.component.html',
  styleUrls: ['./chat-list-view.component.scss']
})
export class ChatListViewComponent implements AfterViewInit {
  @Input()
  public messageList: Message[];

  @ViewChild('messageContainer', {read: ElementRef })
  messageContainer: ElementRef<HTMLElement>;

  @ViewChildren('messageElement', {read: ElementRef})
  chatMessages: QueryList<ElementRef>;

  constructor(private elementRef: ElementRef){
  }

  ngAfterViewInit() {
    this.chatMessages.changes.subscribe(
      (next) => this.scrollToBottom()
    );
  }

  scrollToBottom() {

    this.elementRef.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;

//    const viewportHeight = this.elementRef.nativeElement.getBoundingClientRect().height;
//    const messageContainerHeight = this.messageContainer.nativeElement.getBoundingClientRect().height;
//    const heightDif = messageContainerHeight - viewportHeight;

//    if (heightDif > 0) {
//      this.elementRef.nativeElement.scrollTop = heightDif;
//    }

  }

}

