import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent implements OnInit{

  user: UserInterface | undefined

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (param)=>{
          const idx = Number(param['id'])
          this.userService.getUser(idx)
          .subscribe((res)=>{
            this.user = res.data
          });
      }
    )
  }

}
