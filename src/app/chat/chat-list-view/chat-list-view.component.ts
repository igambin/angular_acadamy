import {AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Message} from '../models/message';
import {MessageDataService} from '../services/message-data.service';
import {Subscription} from 'rxjs';
import {MinuteTimerService} from '../../services/minute-timer.service';

@Component({
  selector: 'jc-chat-list-view',
  templateUrl: './chat-list-view.component.html',
  styleUrls: ['./chat-list-view.component.scss']
})

export class ChatListViewComponent implements OnInit, AfterViewInit, OnDestroy, DoCheck {

  public messageList: Message[] = [];

  private subscription: Subscription;

  public currentTime: Date;

  @ViewChild('messageContainer', {read: ElementRef })
  messageContainer: ElementRef<HTMLElement>;

  @ViewChildren('messageElement', {read: ElementRef})
  chatMessages: QueryList<ElementRef>;

  constructor(
    private elementRef: ElementRef,
    private messageDataService: MessageDataService,
    private messageTimerService: MinuteTimerService
  ) { }

  ngOnInit(): void {
    this.messageDataService.GetAll().forEach(
      (msg) => { this.messageList.push(msg); }
    );
    this.subscription = this.messageDataService.messageCreated.subscribe(
      (message) => { this.messageList.push(message); }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngAfterViewInit() {
    this.chatMessages.changes.subscribe(
      (next) => this.scrollToBottom()
    );
  }

  scrollToBottom() {
    this.elementRef.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  ngDoCheck(): void {
    if (this.currentTime !== this.messageTimerService.currentTime) {
      this.currentTime = this.messageTimerService.currentTime;
    }
  }

}

