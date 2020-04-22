import { Component, OnInit, ViewChild } from '@angular/core';

import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  uid_user:String=''


type :String



    itsBook = true;
    model: NgbDateStruct;
    

  constructor(public router:Router,public auth : AuthService ) { 
    
  
    this.uid_user=auth.getuser()

   if(this.uid_user==''){
     console.log("it's not connected ")
   }
   else{
   console.log("it's connected " + this.uid_user)}


   
   
  }





  ngOnInit() {
  }



}



