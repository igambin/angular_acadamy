import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Message} from '../models/message';
import {MessageDataService} from '../services/message-data.service';

@Component({
  selector: 'jc-chat-list-view',
  templateUrl: './chat-list-view.component.html',
  styleUrls: ['./chat-list-view.component.scss']
})
export class ChatListViewComponent implements OnInit, AfterViewInit {

  public messageList: Message[] = [];

  @ViewChild('messageContainer', {read: ElementRef })
  messageContainer: ElementRef<HTMLElement>;

  @ViewChildren('messageElement', {read: ElementRef})
  chatMessages: QueryList<ElementRef>;

  constructor(
    private elementRef: ElementRef,
    private messageDataService: MessageDataService) { }

  ngOnInit(): void {
    this.messageDataService.GetAll().forEach(
      (item) => this.messageList.push(item)
    );
    this.messageDataService.messageCreated.subscribe(
      (msg) => this.messageList.push(msg)
    );
  }

  ngAfterViewInit() {
    this.chatMessages.changes.subscribe(
      (next) => this.scrollToBottom()
    );
  }

  scrollToBottom() {
    this.elementRef.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }


}

