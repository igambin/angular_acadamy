import { Component, OnInit } from '@angular/core';
import {Message} from './models/message';

@Component({
  selector: 'jc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  public messages: Message[];

  ngOnInit() {
    this.messages = [];
    const msg = new Message('Welcome to Jedi Chat!', 'Channel', true);
    this.messages.push(msg);
  }

  public addMessage(msg: Message): void {
    if (msg.text) { this.messages.push(msg); }
  }
}


