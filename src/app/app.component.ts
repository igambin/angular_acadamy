import {Component, OnInit} from '@angular/core';
import {isUndefined} from 'util';

@Component({
  selector: 'jc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  public user: string;
  public input: string;
  public messages: Message[] = [];

  ngOnInit() {
    const msg = new Message('Welcome to Jedi Chat!', 'Channel', true);
    this.messages.push(msg);
  }

  public onClick(event: Event): void {
    const msg = new Message(this.input, 'me');
    this.messages.push(msg);
    this.input = '';
    document.getElementById('inputField').focus();
  }

  /* at some point, this will be replaced by some way to get messages from a centralized message server */
  public onRightClick(event: Event): void{
    event.preventDefault();
    event.stopPropagation();
    const msg = new Message(this.input, 'default');
    this.messages.push(msg);
    this.input = '';
    document.getElementById('inputField').focus()
  }
}

class Message {
  public text: string;
  public sender: string;
  public isAlert: boolean;
  public classTags: string;
  private alignmentRules: Map<string, string> = new Map([
      ['me', 'left'],
      ['Channel', 'center'],
      ['default', 'right']]
    );

  constructor(text: string, sender: string, isAlert: boolean = false) {
    this.text = text;
    this.sender = sender;
    this.isAlert = isAlert;
    console.log(`called Message::Ctor('${text}','${sender}',${isAlert})`);
    this.classTags = this.evaluateClasses();
  }

  private evaluateClasses(): string {
    const classes: string[] = [];
    // check alignment
    if (this.alignmentRules.get(this.sender) === undefined) {
      this.sender = 'default';
    }
    classes.push(this.alignmentRules.get(this.sender));
    // check alertness
    classes.push(this.isAlert ? 'alert-info' : '');
    // return classTags
    return classes.filter(Boolean).join(' ');
  }
}

