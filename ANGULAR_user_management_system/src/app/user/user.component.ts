import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  /* THE PROPS PASSED FROM FATHER WITH INPUT using parenthesis () in parent element*/
    @Input('user-data') user: User | undefined


  /*
    The function deletUser() starts this emitter and passes the data to its parent through the OUTPUT
    'EMITED TO PARENT AS OUTPUT using square brackets [] in parent element'
  */
    @Output() onDeleteUser = new EventEmitter()
    @Output() onSelectUser = new EventEmitter()

  constructor(
    private userService: UserService,
    private route: Router
  ) { };


  /* FUNCTION ON CLICK IF IS CALLED WILL SEND INTO THE OUTPUT EMITER THE USER user.component.ts/:14 */
  deleteUser(){
    this.onDeleteUser.emit(this.user)
  }

  updateUser(){
    // this.route.navigateByUrl(`/users/${this.user?.id}/edit`)
    // this.onSelectUser.emit(userCopy)
    this.route.navigate(['users', this.user?.id, 'edit'])
  }

  ngOnInit(){

  }
}
