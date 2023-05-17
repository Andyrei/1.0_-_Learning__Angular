import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { UsersResponse, UserService } from "../services/user.service";
import { User } from "../classes/user";
import { Observable } from "rxjs";
import { UserComponent } from "../user/user.component";

/* COMPONENT INITIALIZATION */
@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css']
  })

/* THE CLASS THAT WILL BE EXPORTED */
export class UsersComponent implements OnInit, AfterViewInit{
  title = "Users";
  public users$: Observable<UsersResponse> = this.service.getUsers();

  // TO DELETE A USER RELOADING THE SERVER
  // public users: User[] = []
  @Output() updateUser = new EventEmitter<User>();
  @ViewChildren(UserComponent, {read: ElementRef}) trs!: QueryList<ElementRef>;
/*
  THE CONSTRUCTER SHOULD INITIALIZE ONLY THE MINIMUM NEEDED
  TO BUILD/CONSTRUCT THE COMPONENT
*/
  constructor(private service: UserService) {

  }

  ngAfterViewInit(): void {
  }
  /*
    IN OnInit CAN BE USED TO MAKE SOME CALLS
    THAT WILL POPULATE THE REAL VALUES INTO THE CONSTRUCTER
  */
  ngOnInit(): void{

    // RECALLING THE SERVER WITH THE NEW USERS
    /* this.service.getUsers().subscribe(res=>{
      this.users = res
    }) */
  }


  onDeleteUser(user: User){
    this.service.deleteUser(user).subscribe(res=>
      {
        this.trs.forEach(ele => {
          const el = ele.nativeElement;
          if(Number(el.id)=== user.id){
            el.parentNode.removeChild(el)
          }
        })
        // RECALLING THE SERVER WITH THE NEW USERS
        // this.service.getUsers().subscribe(res => this.users = res)
      }
    );

  }

  onSelectUser(user: User){
    this.updateUser.emit(user);
  }
}
