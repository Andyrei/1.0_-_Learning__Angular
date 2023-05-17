# UserManagementSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




# LEARNED

## 1. ANGULAR SERVICE
 Angular services are classes with `objects / reusable code` into them that can get instantiated just once during the lifetime of an application that can be used accros the multiple components. 
 
 A component should use services for tasks that don't involve the view or application logic. Services are good for tasks such as fetching data from the server, validating user input, or logging directly to the console. [For more!](https://angular.io/guide/architecture-services)
 
 It can be used different ways if created manualy: 
  - __Can be used directly into the `contstructor`__ of a component just calling its method after it get typed for TS: <br/><br/>
  <code>
    constructor(){
        this.__users__ = __UsersService__.getUsers()
      }
  </code><br/>
  <sup>PROBLEM: </sup>  Being called like this, for any refactor of the `class Service` it has to be done into the components to.


  -  __Can be used with providers__ only in one instance only and every time is recalled the service is recreated and can be inserted into the component under the provider as: `providers: [UserService]`\
  <code>
  \
   @Component({
    ...
    providers: [UserService],
    ...
   })
    \
    constructor(private service: __UsersService__){
      this.__users__ = service.getUsers()
    }
  </code><br/>


  * Or can even be used as Global
  1. Into `app.module.ts` into the array of providers<br/> 

  2. Into the Service class inside the injectable (THIS IS THE DEFAULT MODE) `@Injectable({providedIn: 'root'})` 

CREATED WITH THE NG COMMAND  `ng g (or generate) service <name>`


## 2. NEW COMPONENT / PASS DATA
  - Creating a new component using the bash `ng generate component <name>` will create a a folder with style, html and ts into it.

  - Sharing data between child and parent <sup>[For more...](https://angular.io/guide/inputs-outputs)<sup>
    1. an Input for passing props should be initialized into the child as:
      `@Input('user-data') user` importing the `{Input}`
      
    2. Into the parent should be passed into the `<app-user [user-data]="user"></app-user>` in this case is passed as an attribute to the tag element <tr>

    3. Events/Data can be passed through the parrent too using the Output decorator.
    \
    \
  `@Output(onDeleteUser) userDeleted = new EventEmitter()` imported from angular as `import { EventEmitter } from '@angular/core'`
    
## 3. Events

  The Events in Angular are passed into the interested component itself using the parenthesis like so:  `(click)="myFunc()"`. 

  The function is initialized into the class using `this.` or passing it as an argument






# ADDED json-server
  command to start serve api otherwise is not working -> `json-server --watch db.json`
  
  ## CRUD LESSON
    Added a fake server for the CRUD requests to an API 
