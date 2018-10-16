import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { ChatMessageItemComponent } from './chat-list-view/chat-message-item/chat-message-item.component';
import { ChatListViewComponent } from './chat-list-view/chat-list-view.component';
import { ChatInputFormComponent } from './chat-input-form/chat-input-form.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatMessageItemComponent,
    ChatListViewComponent,
    ChatInputFormComponent,
 ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [ChatComponent],
  providers: [],
  bootstrap: [ChatComponent]
})
export class ChatModule { }
