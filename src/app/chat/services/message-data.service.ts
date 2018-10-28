import {Injectable} from '@angular/core';
import {Message} from '../models/message';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageDataService {

  private readonly messages: Message[] = [
    new Message('Welcome to Jedi Chat!', 'Channel', true)
  ];

  public messageCreated: Subject<Message>;

  constructor(
  ) {
    this.messageCreated = new Subject<Message>();
  }

  private latestMessage(): Message {
    if (this.messages.length > 0) {
      return this.messages[this.messages.length - 1];
    }
    return null;
  }

  public GetAll(): Message[] {
    return this.messages;
  }

  public AddMessage(message: Message): void {
    if (message) {
      const latestMessage = this.latestMessage();
      if (latestMessage !== null && message.sender === latestMessage.sender) {
        latestMessage.cardAlign += ' hasFollowUps';
        message.cardAlign += ' neighbor';
      }
      this.messages.push(message);
      this.messageCreated.next(message);
    }
  }
}
