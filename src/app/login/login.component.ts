import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  userDetails: any;

  constructor(private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    let currentSession = this.loginService.authenticateSession();
    if (currentSession) {
      this.router.navigate(['/user']);
    }
  }

  validateUser(details) {
    this.loginService.authenticateUser(details).subscribe(payload => {
      if (payload.status === 200) {
        this.userDetails = payload.response[0];
        sessionStorage.setItem('userDetails', JSON.stringify(this.userDetails));
        this.router.navigate(['/user']);
      } else if (payload.status === 400) {
        console.error(payload.err);
        this.loginForm.reset();
      }
    }, (err) => {
      console.error(err);
      this.loginForm.reset();
    });
  }

}
