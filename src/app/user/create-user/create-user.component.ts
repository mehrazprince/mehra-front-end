import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      groupadmin: [false]
    });
  }

  createUser(user) {
    this.userService.addUser(user).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['/user']);
      } else {
        console.error(res.response);
      }
    }, (err) => {
      console.error(err);
    });
  }
}
