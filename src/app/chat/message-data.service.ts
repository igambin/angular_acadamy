import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './models/message';

@Injectable({
  providedIn: 'root'
})

export class MessageDataService {

  public messageCreated: EventEmitter<Message> = new EventEmitter();

  private messages: Message[] = [
    new Message('Welcome to Jedi Chat!', 'Channel', true)
  ];

  public GetAll(): Message[] {
    return this.messages;
  }

  public AddMessage(message: Message): void {
    if (message) {
      const latestMessage = this.latestMessage();
      if (message.sender === latestMessage.sender) {
        latestMessage.cardAlign += ' hasFollowUps';
        message.cardAlign += ' neighbor';
      }
      this.messages.push(message);
      this.messageCreated.emit(message);
    }
  }

  private latestMessage(): Message {
    return this.messages[this.messages.length - 1];
  }
}
