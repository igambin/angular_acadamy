import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { ChatListViewComponent } from './chat-list-view/chat-list-view.component';
import { ChatInputFormComponent } from './chat-input-form/chat-input-form.component';

@NgModule({
  declarations: [
    ChatComponent,
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
