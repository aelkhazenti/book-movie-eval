import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"


import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage'
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {StarService} from '../services/star.service'
import {SercheService} from '../services/serche.service'

import {Router} from '@angular/router'
import { Observable} from 'rxjs';
import {finalize, tap}from 'rxjs/operators'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
  
})
export class HomeComponent implements OnInit {

  stars : Observable<any>
  avgRating:Observable<any>
  note=0;




  itemFilme :AngularFireList<any>; 
  itemLivre :AngularFireList<any>; 

  itemFilme2 :AngularFireList<any>; 
  itemArraLivre=[]
  
  readonlyforme = false;
  
  readonly = true;
  
  itemArra=[]
  itemArra2=[]
 objectItem:number


itemShare :any

listedesAmies:Observable<any[]>

  user: Observable<any>;
  movie: Observable<any>;

 
   constructor(private afStorage: AngularFireStorage,public db:AngularFireDatabase,
    public router:Router,private afs: AngularFirestore,public auth : AuthService,
    public starserv:StarService,public serc :SercheService,private modalService: NgbModal ) { 
    
    
    this.itemFilme = db.list('filme')
    this.itemLivre = db.list('livre')
    
    this.itemArra=[]
      
        this.itemFilme = this.db.list('/filme')
    
        this.itemFilme.snapshotChanges().subscribe(actions=>{
          actions.forEach(Action=>{
           let y=  Action.payload.toJSON()
            y['$key']= Action.key
            this.itemArra.push(y as listfilm ) 
          })
        })

        console.log(this.itemArra)
        this.itemArraLivre=[]
this.itemLivre = this.db.list('/livre')

this.itemLivre.snapshotChanges().subscribe(actions=>{
  actions.forEach(Action=>{
    let liv=  Action.payload.toJSON()
    liv['$key']= Action.key
    this.itemArraLivre.push(liv as listlivre)

  })
})
console.log(this.itemArraLivre)


const useruid = localStorage.getItem('uiduser')

var path = useruid+"/amis/accepted"

 this.listedesAmies = this.afs.collection(path).valueChanges()


  }
  

  votre_Vote(item){

   const userId:String  = localStorage.getItem("uiduser")
   var movieId = item;
   var value = item.note
   var keymovi=item.$key
    


  //  this.starserv.getItem(item).subscribe(items =>{
    
  //    if(items==null){
  //       console.log("null")
  //    }
  //    else{
  //   this.objectItem = items.value;
  //    }
  // })

  console.log("user"+this.objectItem)
  console.log("database"+item.note)

this.calculrating(item)





    if(userId==null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'vous devez connecter pour voter',
        footer: '<a href="/signup"> go to register page  </a>'
      })
    }  
    else  {

      // console.log(userId)

      var numerateur =  (item.vote1star * 1) + (item.vote2star * 2) +(item.vote3star * 3) + (item.vote4star * 4) + (item.vote5star * 5)
var denominateur = item.vote1star+item.vote2star+item.vote3star+item.vote4star+item.vote5star
var result = numerateur/denominateur
if (item.noteGenerale == 0){
  this.itemFilme.update(keymovi,{
    noteGenerale: numerateur,
    nbrvote: denominateur
  })
}else{

this.itemFilme.update(keymovi,{
  noteGenerale: result,
  nbrvote: denominateur
})
}


      const star: Star ={ 
        userId, 
        movieId, 
        value
      }

      const pathst = star.userId+'/'+keymovi
      
      
      this.afs.doc(pathst).set(star)

    }
 

    
  }
  
getRating(item){
  const userId:String  = localStorage.getItem("uiduser")
  var movieId = item;
  var value = item.note
  var keymovi=item.$key  

  this.starserv.getItem(item).subscribe(items =>{  
    if(items==null){
       console.log("not login")
       const star: Star ={ 
        userId, 
        movieId, 
        value
      }
      const pathst = star.userId+'/'+keymovi
      this.afs.doc(pathst).set(star)
    }
    else{
   this.objectItem = items.value;
    }
 })

}


  ngOnInit() {

  }


  modif(item){var keymovi=item.$key
    this.itemFilme.set(keymovi,{

      nomfilme : item.nomfilme,
      categorie : item.categorie,
      datesortie : item.datesortie,
      director : item.director,
      durefilm : item.durefilm,
      type : item.type,
      urlimage : item.urlimage, 
      note: item.note,
      nbrvote: 0 ,   
    
      noteGenerale : 0,
    
      vote1star :0,
      vote2star :0,
      vote3star :0,
      vote4star :0,
      vote5star :0,
    })
    this.itemArra=[]
  }

  calculrating(item){
    var keymovi=item.$key

    if(this.objectItem == item.note){

    }else if (item.note == 1){
      this.itemFilme.update(keymovi,{
        vote1star: item.vote1star + 1
      })
    }else if (item.note == 2){
      this.itemFilme.update(keymovi,{
        vote2star: item.vote2star + 1
      })
    }else if (item.note == 3){
      this.itemFilme.update(keymovi,{
        vote3star: item.vote3star + 1
      })
    }else if (item.note == 4){
      this.itemFilme.update(keymovi,{
        vote4star: item.vote4star + 1
      })
    }else if (item.note == 5){
      this.itemFilme.update(keymovi,{
        vote5star: item.vote5star + 1
      })
    }
    
    
    if(this.objectItem == item.note){
    
    }else if (this.objectItem == 1){
      this.itemFilme.update(keymovi,{
        vote1star: item.vote1star - 1
      })
    }else if (this.objectItem == 2){
      this.itemFilme.update(keymovi,{
        vote2star: item.vote2star - 1
      })
    }else if (this.objectItem == 3){
      this.itemFilme.update(keymovi,{
        vote3star: item.vote3star - 1
      })
    }else if (this.objectItem == 4){
      this.itemFilme.update(keymovi,{
        vote4star: item.vote4star - 1
      })
    }else if (this.objectItem == 5){
      this.itemFilme.update(keymovi,{
        vote5star: item.vote5star - 1
      })
    }
    this.itemArra=[]

    this.itemFilme.snapshotChanges().subscribe(actions=>{
      actions.forEach(Action=>{
       let y=  Action.payload.toJSON()
        y['$key']= Action.key
        this.itemArra.push(y as listfilm ) 
      })
    })

    
  }
  
  
  partageWhithFriends(content,item)  {
    
    this.modalService.open(content,{size : 'xl'});

  this.itemShare = item;



  }

sharwhithFR(item,user){
  
  // alert(user.displayName+"-----"+user.photoURL)

  var nameItem = this.itemShare.nomfilme
  var IMGItem =  this.itemShare.urlimage
  var noteGenerale =  this.itemShare.noteGenerale
  var typeItem = this.itemShare.type

  var FriendsIMG = user.photoURL
  var FriendsUsername = user.displayName 

const frShare :itemShare={
  nameItem,
  IMGItem,
  noteGenerale,
  typeItem,

  FriendsIMG,
  FriendsUsername
}


const path = item.userUID+"/amis/messages/"

this.afs.collection(path).add(frShare)

console.log("work :) "+item.userUID)

}


}


export class listlivre{
  
  $key :string;

  nomlivre :string;
  nomauteur :string;
  dateparu :string;
  nbrpage :string;
  type :string;
  urlimage :string;        
  categorie :string;
  note:String;
  nbrvote:String;

}

export class listfilm {
  
  
  $key :string;

  nomfilme :string;
  categorie :string;
  datesortie :string;
  director :string;
  durefilm :string;
  type :string;
  urlimage :string;
  note:String;
  nbrvote:String;

}

export interface Star {
  userId: String;
  movieId: any;
  value: number;

}


export interface itemShare {

  nameItem : String;
  IMGItem : String;
  noteGenerale :String;
  typeItem :String;

  FriendsIMG:String;
  FriendsUsername:String;

}
 

