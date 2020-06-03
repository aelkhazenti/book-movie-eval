import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model'; 
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class NavbarComponent implements OnInit {

  userinvit : invitation[] = []
  username:String="";

datauserInvit = []
newfriendsINvite =[]

  users :Observable<any[]>
  listInvit :Observable<any[]>
  listMessage :Observable<any[]>

  listedesAmies:Observable<any[]>
  listedesAmiesArray =[]
  listMessageArray =[]

  listOfFriends:Observable<any[]>
  arrayOfFriends =[]

  constructor( public auth : AuthService ,config: NgbModalConfig, private modalService: NgbModal ,public afs:AngularFirestore ) { 
    config.backdrop = 'static';
    config.keyboard = false;

    this.users = this.afs.collection('users').valueChanges();

    this.users.subscribe(res=>{
      this.newfriendsINvite = res
    })

    
    
    const useruid = localStorage.getItem('uiduser')

if(useruid==null){

}else{

    var path = useruid+"/amis/invitation"
    
    
    this.listInvit = this.afs.collection(path).valueChanges()

    
    var path = useruid+"/amis/accepted"

 this.listedesAmies = this.afs.collection(path).valueChanges()


 this.listedesAmies.subscribe(res=>{
   this.listedesAmiesArray = res
 })
 
 var path = useruid+"/amis/messages/"

 this.listMessage = this.afs.collection(path).valueChanges()
 this.listMessage.subscribe(res=>{
  this.listMessageArray = res
})


}
  }

  ngOnInit() {
  }


  open(content) {
    this.modalService.open(content,  { size: 'xl' });

 console.log(this.listedesAmiesArray)
 
console.log("------")

 for (var y=0 ; y <this.newfriendsINvite.length;y++){

  
  for(var i=0;i<this.listedesAmiesArray.length;i++){


    

    if(this.newfriendsINvite[y].uid === this.listedesAmiesArray[i].userUID){
      console.log(y+this.newfriendsINvite[y].uid)
        this.newfriendsINvite.splice(y,1)
        
    }

  }

 }

 console.log(this.newfriendsINvite)


  }

 

  openMessage(message){

    if(this.listMessageArray.length==0){
      Swal.fire('aucun message')
    }else{
      this.modalService.open(message) 
    }

  

   

  }

  openIvite(Invitation){
    this.modalService.open(Invitation,{size :'xl'})

    
    const useruid = localStorage.getItem('uiduser')

    var path = useruid+"/amis/invitation"
    
    
    this.listInvit = this.afs.collection(path).valueChanges()

    this.listInvit.subscribe(res=>{
      this.datauserInvit = res
    })
    
  }

  addToFriends(users,user){
    const useruid = localStorage.getItem('uiduser')

    var path = useruid+"/amis/accepted/"+users.userUID
    var path2 = users.userUID+"/amis/accepted/"+useruid

    var userIMG = users.userIMG
    var userName = users.userName
    var userEMAIL = users.userEMAIL
    var userUID = users.userUID
    var invitation = "false"
    
    const amis :invitation={ 
      userIMG ,
      userUID ,
      userName ,
     invitation,
     userEMAIL ,
    
    }

    this.afs.doc(path).set(amis)


     userIMG = user.photoURL
     userName = user.displayName
     userEMAIL = user.email
     userUID = user.uid
    invitation = "false"

    const amis2:invitation={
      userIMG ,
      userUID ,
      userName ,
     invitation,
     userEMAIL    

    }

  this.afs.doc(path2).set(amis2)
    

    var pathDelt = useruid+"/amis/invitation/"+users.userUID
    this.afs.doc(pathDelt).delete()

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'vous avez amis avec '+users.userName,
      showConfirmButton: false,
      timer: 1500
    })

  }

  DeltFriends(users){
    const useruid = localStorage.getItem('uiduser')
    var path = useruid+"/amis/invitation/"+users.userUID
    this.afs.doc(path).delete()

  }


  searchNewFr(){
    if(this.username == ""){

      this.users = this.afs.collection('users').valueChanges();

      this.users.subscribe(res=>{
        this.newfriendsINvite = res
      })
    }

    else{
      console.log(this.newfriendsINvite)
   this.newfriendsINvite =  this.newfriendsINvite.filter(res=>{
  
    return res.displayName.toLowerCase().match(this.username.toLowerCase())
  })
    }
  
  }

search(){
  console.log(this.datauserInvit)

  if(this.username == ""){
    const useruid = localStorage.getItem('uiduser')

    var path = useruid+"/amis/invitation"
    
    
    this.listInvit = this.afs.collection(path).valueChanges()

    this.listInvit.subscribe(res=>{
      this.datauserInvit = res
    })
  }
  else{
 this.datauserInvit =  this.datauserInvit.filter(res=>{

  return res.userName.toLowerCase().match(this.username.toLowerCase())
})
  }
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

    this.afs.doc(pathInvitation).set(invit)
     Swal.fire({
      icon: 'success',
      title: 'votre invitation a ete envoyer a '+allUsers.displayName,
      showConfirmButton: false,
      timer: 1500
    })
    
  }
  testFOe(allUsers){



  }

}

export interface invitation {
  userIMG:String;
  userUID:String;
  userName:String;
  invitation:String;
  userEMAIL:String;
  // date:Date
}