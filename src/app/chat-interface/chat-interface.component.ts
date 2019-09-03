import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { sortBy as _sortBy } from 'lodash';

import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css']
})
export class ChatInterfaceComponent implements OnInit {
  chatData: Observable<any[]>;
  loggedInUser: number;
  chatMessage: string;
  private _docSub: Subscription;
  private _userSub: Subscription;
  userLoggedIn: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUser();
    this.chatService.getMessages();
    this._docSub = this.chatService.messages.subscribe(res => {
      res = _sortBy(res, ['timestamp']);
      this.chatData = res
    });
  }

  sendMessage(message: string) {
    this.chatService.addMessages(message, this.loggedInUser);
    this.chatMessage = '';
    this.chatService.getMessages();
  }

  logIn(user) {
    this.loggedInUser = parseInt(user); 
    this.userLoggedIn = true;
  }
}
