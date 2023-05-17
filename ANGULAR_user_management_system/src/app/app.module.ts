import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserDataComponent } from './user-data/user-data.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({

  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    UserDataComponent,
    LoginComponent,
    SignupComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
