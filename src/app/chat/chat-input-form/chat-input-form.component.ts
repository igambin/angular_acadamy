import { Component, EventEmitter, Output} from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'jc-chat-input-form',
  templateUrl: './chat-input-form.component.html',
  styleUrls: ['./chat-input-form.component.scss']
})

export class ChatInputFormComponent {
  @Output()
  messageCreated: EventEmitter<Message> = new EventEmitter();

  public input: string;

  public onClick(event: Event): void {
    const msg = new Message(this.input, 'me');
    this.messageCreated.emit(msg);
    this.input = '';
    document.getElementById('inputField').focus();
  }

  /* at some point, this will be replaced by some way to get messages from a centralized message server */
  public onRightClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const msg = new Message(this.input, 'default');
    this.messageCreated.emit(msg);
    this.input = '';
    document.getElementById('inputField').focus();
  }
}
