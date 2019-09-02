import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
    user = this.socket.fromEvent<UserInterface>('user');
    messages = this.socket.fromEvent<Observable<any[]>>('messages');

    constructor(private socket: Socket) { }

    getUser() {
        this.socket.emit('getUser');
    }

    getMessages() {
        this.socket.emit('getMessages');
    }

    addMessages(messages: any, userId: number) {
        let dataSet = {
            id: userId,
            message: messages
        }
        this.socket.emit('addMessage', dataSet);
    }
}

class UserInterface {
    id: number;
    username: string;
    password: string;
    type: string;
}