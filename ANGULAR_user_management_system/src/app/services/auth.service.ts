import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import {tap} from "rxjs/operators";
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Jwt {
  access_token: string,
  token_type: string
  expires_in : number,
  user_name: string,
  email: string
}

@Injectable()

export class AuthService {

  private isUserLogged = true;
  @Output() userSignedIn = new EventEmitter<User>();
  @Output() userSignedUp = new EventEmitter<User>();
  @Output() userLoggedOut = new EventEmitter();

  private API_AUTH_URL = environment.API_AUTH;



  constructor(private http: HttpClient) { }

  isUserLoggedIn(){
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }




  async signIn(email: string, password: string){

    await lastValueFrom(this.http.post<Jwt>(`${this.API_AUTH_URL}/login`,
        {
          email: email,
          password: password
        }))
        .then((res: Jwt) => {
          console.log('res :>> ', res)
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res));

          const user = new User();
          user.name = res.user_name;
          user.email = res.email

          this.userSignedIn.emit(user)
          return true;
        })
        .catch(
          (httpRes: HttpErrorResponse) => {
          console.error(httpRes.message)
          }
        )
  }




  async signUp(username: string, email: string, password: string){

    await lastValueFrom(this.http.post<Jwt>(`${this.API_AUTH_URL}/signup`,
        {
          name: username,
          email: email,
          password: password,
        }))

        .then((res: Jwt) => {

          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res));

          const user = new User();
          user.name = res.user_name;
          user.email = res.email

          this.userSignedUp.emit(user)

        })
        .catch(
          (httpRes: HttpErrorResponse) => {
          console.error(httpRes.message)
          }
        )


  }




  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    this.userLoggedOut.emit();

    this.isUserLogged = false;
  }


  getUser(): User {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    let user = new User();

    if(data){
        user.name = data.user_name;
        user.email = data.email
    }
    return user;
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
