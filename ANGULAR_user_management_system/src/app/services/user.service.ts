import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { User } from "../classes/user";
import { UserInterface } from "../interfaces/user";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export interface UsersResponse{
  data: User[];
  message: string;
  status: boolean;
}
export interface UserResponse{
  data: User;
  message: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiUrl = environment.API_USERS;

  constructor(private http: HttpClient, private auth: AuthService){
  }
  getAuthHeader(): HttpHeaders{
    let headers = new HttpHeaders(
      {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    )

    return headers;

  }

  /*
      ! GET ALL USERS FROM API
   */
  getUsers(): Observable<UsersResponse> { /* THE METHOD THAT WILL SHOW THE OBJECT OF USERS */
    return this.http.get<UsersResponse>(`${this.apiUrl}`, {headers: this.getAuthHeader()})
    //BEFORE ADDING API
    // return this.users
  }
  /*
    ! GET SINGLE USER FROM API
  */
  getUser(id: number): Observable<UserResponse>{
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`, {headers: this.getAuthHeader()})

    // BEFORE ADDING API
    // return this.users.find(user => user.id === id) // is searching the user where the user id is == to the id from route
  }


  /*
    ! DESTROY USER ON API
  */
  deleteUser(user: User) { /* THE METHOD THAT WILL DELETE A SPECIFIC USER */

    return this.http.delete<UserResponse>(`${this.apiUrl}/${user.id}`, {headers: this.getAuthHeader()})

    //BEFORE ADDING API
    // const iDx = this.users.indexOf(user)

    // if(iDx > -1) {
    //   this.users.splice(iDx, 1);
    // }
  }

  /*
    ! UPDATE USER ON API
  */
  updateUser(user: UserInterface): Observable<UserResponse>{

    return this.http.put<UserResponse>(`${this.apiUrl}/${user.id}`, user, {headers: this.getAuthHeader()})

    // BEFORE ADDING API
    // const iDx = this.users.findIndex((v)=> v.id == user.id);
    // if(iDx !== -1){
    //   this.users[iDx] = {...user}
    // }
  }

  /*
    ! CREATE NEW USER
  */
  createUser(user: UserInterface): Observable<UserResponse>{

    return this.http.post<UserResponse>(this.apiUrl, user)

    // BEFORE ADDING API
    // const iDx = this.users.length + 1
    // this.users.splice(0,0,{...user})
  }

}
