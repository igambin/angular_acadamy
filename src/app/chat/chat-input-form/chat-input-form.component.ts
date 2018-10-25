import { Component } from '@angular/core';
import { Message } from '../models/message';
import { MessageDataService } from '../message-data.service';

@Component({
  selector: 'jc-chat-input-form',
  templateUrl: './chat-input-form.component.html',
  styleUrls: ['./chat-input-form.component.scss']
})

export class ChatInputFormComponent {

  public input: string;

  constructor(
    private dataService: MessageDataService
  ) {
    this.input = '';
  }

  public onClick(event: Event): void {
    this.createMessage('me');
  }

  /* at some point, this will be replaced by some way to get messages from a centralized message server */
  public onRightClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.createMessage('default');
  }

  private createMessage(sender: string): void {
    if (!this.isNullOrWhitespace(this.input)) {
      const msg = new Message(this.input, sender);
      this.dataService.AddMessage(msg);
      this.input = '';
    }
    document.getElementById('inputField').focus();
  }

  public isNullOrWhitespace(str): boolean {
    return str === null || str.match(/^\s*$/) !== null;
  }

}
