import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router){
    auth.userSignedIn.subscribe((user: User) => {
          router.navigate(['/'])
        })
  }

  ngOnInit() {

  }

  signIn(form: NgForm) {
    this.auth.signIn(form.value.email, form.value.pwd);
  }
}
