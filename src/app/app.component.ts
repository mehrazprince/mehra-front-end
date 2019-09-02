import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { sortBy as _sortBy } from 'lodash';

import { ChatService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  chatData: Observable<any[]>;
  loggedInUser: number;
  chatMessage: string;
  private _docSub: Subscription;
  private _userSub: Subscription;
  userLoggedIn: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // this.loggedInUser = 1;
    this.chatService.getUser();
    this.chatService.getMessages();
    this._docSub = this.chatService.messages.subscribe(res => {
      console.log(`UnSorted ${res}`);
      res = _sortBy(res, ['timestamp']);
      console.log(`Sorted ${res}`);
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

class ChatInterface {
  id: number;
  userId: number;
  value: string;
}