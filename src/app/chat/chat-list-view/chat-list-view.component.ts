import {Component, Input} from '@angular/core';
import {Message} from '../models/message';

@Component({
  selector: 'jc-chat-list-view',
  templateUrl: './chat-list-view.component.html',
  styleUrls: ['./chat-list-view.component.scss']
})
export class ChatListViewComponent {
  @Input()
  public messageList: Message[];
}

