import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit{
  private userCopy: User;
  private __user: User;


  @Input() set user(user: User){
    this.__user = user;
    this.userCopy = Object.assign({}, user);
  };

  get user(){
    return this.__user;
  }

  displayMessage: {[key:string]:string } = {};


  constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.user = new User();
    this.__user = new User();
    this.userCopy = new User();
  }


  ngOnInit(){
    this.route.params.subscribe(
      (params)=>{
          if(params['id']){
            const id = Number(params['id']);
            this.userService.getUser(id).subscribe((res)=>{
              this.user = res.data
            })
          }

          /* BEFORE ADDING API

            if (user){
              // this.user = user
            }else{
              // NAVIGATE TO A NOT FOUND
              this.router.navigateByUrl('/notfound')
            }
          */
      }
    )
  }

  saveUser(){
    let obs;

    if(this.user.id > 0){
      obs = this.userService.updateUser(this.user)
    }else{
      // create new user
      obs = this.userService.createUser(this.user)
    }

    obs.subscribe((data)=>{
      console.log('response :>> ', data);
      this.router.navigate(['users'])
    })

  }

  resetUser(form: any){
    if(this.user.id === 0 ){
      this.user = new User();
    } else{
      this.user = this.userCopy;
    }
  }
}
