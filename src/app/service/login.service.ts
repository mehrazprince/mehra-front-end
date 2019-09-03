import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ServiceConstants } from './constants';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  authenticateUser(user): Observable<any> {
    return this.http.post<any>(`${ServiceConstants.serverUrl}/api/auth`, user);
  }

  authenticateSession() {
    let userData = sessionStorage.getItem('userDetails');
    return userData;
  }
}