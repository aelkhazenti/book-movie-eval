import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string = '';
  mdp:string = ''; 
  constructor (public auth : AuthService, public router : Router ) {}

  ngOnInit(): void {
  }

login(){
 this. auth.loginwhithemailandpass(this.email,this.mdp)
 this.router.navigate(['/'])
}
loginGoogle(){
 this. auth.googleSignin()

 this.router.navigate(['/'])
}


}