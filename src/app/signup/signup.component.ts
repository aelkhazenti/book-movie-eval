import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  passwordConfirmationFailed = false;
  passwordConfirmationTxt = '';
 
  signup = new Signup('','','','') ;


  confirmPassword() {
    if (this.signup.password === this.passwordConfirmationTxt) {
      this.passwordConfirmationFailed = false;
    } else {
      this.passwordConfirmationFailed = true;
    }
  }
  
  registerForm: FormGroup;
  submitted = false;

imgURLF:String='https://www.w3schools.com/howto/img_avatar2.png';
imgURLM:String='https://www.w3schools.com/howto/img_avatar.png'
  email:string = '';
  mdp:string = ''; 
  username:String='';
  sex:String='';


  constructor(private fire:AngularFireAuth ,public router:Router , private formBuilder: FormBuilder,private auth:AuthService){}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      
  });

    
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}

register(){

  this.fire.createUserWithEmailAndPassword(this.email,this.mdp)
  .then(user=>{
    console.log("correct")
    
      this.router.navigate(['home'])
    }) .catch(error=>{
      console.error(error)
      this.router.navigate(['admin'])
    });
  
}

registerEmail(){

  this.fire.createUserWithEmailAndPassword(this.email,this.mdp)
  .then(user=>{
    console.log("correct")
    if(this.sex=="F"){

      this.auth.loginWithemail(this.email,this.mdp,this.username,this.imgURLF)
    
    }if(this.sex=="M"){
    
      this.auth.loginWithemail(this.email,this.mdp,this.username,this.imgURLM)
    
    }

    
    }) .catch(error=>{
      console.error(error)
      this.router.navigate(['admin'])
    });


  this.router.navigate(['/'])

}

changesex(event){

  this.sex = event.target.value;

}


}


export class Signup {
 
  constructor (
    public email: string,
    public name: string,
    public password: string,
    public country: string,
  ) {  }
 
}


