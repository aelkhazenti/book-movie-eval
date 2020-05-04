import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model'; 
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class NavbarComponent implements OnInit {

  users :Observable<any[]>

  constructor( public auth : AuthService ,config: NgbModalConfig, private modalService: NgbModal ,public afs:AngularFirestore ) { 
    config.backdrop = 'static';
    config.keyboard = false;


    this.users = this.afs.collection('users').valueChanges();
    console.log(this.users)

  }

  ngOnInit() {
  }


  open(content) {
    this.modalService.open(content,  { size: 'xl' });
  }

  ajoute(user,allUsers){

    var userIMG =user.photoURL ;
    var userUID =user.uid ;
    var userName = user.displayName;
    var invitation = "true";
    var userEMAIL = user.email;

    const pathInvitation = allUsers.uid+"/amis/invitation/"+user.uid

    const invit :invitation={
      userIMG ,
     userUID ,
     userName ,
    invitation,
    userEMAIL
    }

    // this.afs.doc(pathInvitation).set(invit);

    this.afs.doc(pathInvitation).set(invit)
    console.log(pathInvitation);

    // console.log(allUsers.uid+"/amis/invitation"+user.uid)
  }

}

export interface invitation {
  userIMG:String;
  userUID:String;
  userName:String;
  invitation:String;
  userEMAIL:String;
}