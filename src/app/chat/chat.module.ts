import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { ChatListViewComponent } from './chat-list-view/chat-list-view.component';
import { ChatInputFormComponent } from './chat-input-form/chat-input-form.component';
import { MessageDateFormatPipe } from './message-date-format.pipe';
import {MessageDataService} from './message-data.service';

@NgModule({
  declarations: [
    ChatComponent,
    ChatListViewComponent,
    ChatInputFormComponent,
    MessageDateFormatPipe,
 ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [ChatComponent],
  providers: [MessageDataService],
  bootstrap: [ChatComponent]
})
export class ChatModule { }
