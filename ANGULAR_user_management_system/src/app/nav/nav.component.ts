import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  @Output() onNewUser = new EventEmitter();

  // isUserLoggedIn = this.auth.isUserLoggedIn();
  isUserLoggedIn = true;
  username: string = '';


  constructor(private auth: AuthService, private router: Router){
    auth.userSignedIn.subscribe(
      (user: User)=>{
        this.username = user.name;
        this.isUserLoggedIn = true;
      })
    auth.userSignedUp.subscribe(
      (user: User)=>{
        this.username = user.name;
        this.isUserLoggedIn = true;
      })

    auth.userLoggedOut.subscribe(()=>{
      this.username = '';
      this.isUserLoggedIn = false;
    })

  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
    if(this.isUserLoggedIn){
      const user = this.auth.getUser();
      this.username = user.name;
    }
  }
  newUser(){
    this.onNewUser.emit();
  }

  logOut(e: Event){
    e.preventDefault();

    this.auth.logOut();
    this.router.navigate(['login'])
  }

  signIn(e: Event){
    e.preventDefault();
    this.router.navigate(['login'])
  }

  signUp(e: Event){
    e.preventDefault();
    this.router.navigate(['signup'])
  }

}

