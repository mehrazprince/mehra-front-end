import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ServiceConstants } from './constants';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList(userDetails): Observable<any> {
    return this.http.post<any>(`${ServiceConstants.serverUrl}/api/user`, userDetails);
  }

  addUser(user): Observable<any> {
    return this.http.post<any>(`${ServiceConstants.serverUrl}/api/addUser`, user);
  }
  
}
