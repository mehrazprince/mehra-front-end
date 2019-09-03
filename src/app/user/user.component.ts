import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';
    
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: any;
  usersList: any[];
  isSuperAdmin: boolean;
  constructor(private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.usersList = [];
    this.isSuperAdmin = false;
    let currentSession = this.loginService.authenticateSession();
    if (!currentSession) {
      this.router.navigate(['/login']);
    } else {
      this.currentUser = JSON.parse(currentSession);
      if (this.currentUser && this.currentUser.type === 'supp') {
        this.isSuperAdmin = true;
        this.getUsers(this.currentUser);
      } else {
        this.usersList.push(this.currentUser);
      }
    }
  }

  getUsers(user) {
    let payload = {
      username: user.username,
      type: user.type
    }
    this.userService.getUserList(payload).subscribe((users) => {
      this.usersList = users;
    });
  }
}
