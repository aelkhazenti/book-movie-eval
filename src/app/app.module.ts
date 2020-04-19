import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddItemComponent } from './add-item/add-item.component';
import { HomeComponent } from './home/home.component';

import { RouterModule,Routes} from '@angular/router';
import { environment } from 'src/environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage'
import { AuthService } from './services/auth.service' ; 

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import {  FormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const routes:Routes =[
  {  path:'' ,redirectTo:'homecontent',pathMatch:'full'},
  {path:'home' , component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'additem',component:AddItemComponent},
  {path:'homecontent',component:SidebarComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AddItemComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
  
  ],

imports: [
  NgbModule,
  BrowserModule,
  AppRoutingModule,
  BrowserModule,
  RouterModule.forRoot(routes),
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireStorageModule,
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  FormsModule,
  BrowserAnimationsModule,
  
 
  




],
providers: [],
bootstrap: [AppComponent]
})

export class AppModule { }