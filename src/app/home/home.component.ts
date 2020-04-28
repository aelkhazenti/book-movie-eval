import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"


import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage'
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'

import {StarService} from '../services/star.service'

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

  itemArraLivre=[]
  
  readonlyforme = false;
  
  readonly = true;
  
  itemArra=[]
  
 objectItem:number

  user: Observable<any>;
  movie: Observable<any>;

 
   constructor(private afStorage: AngularFireStorage,public db:AngularFireDatabase,public router:Router,private afs: AngularFirestore,public auth : AuthService,public starserv:StarService ) { 
    
    
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




  }
  

  votre_Vote(item){

   const userId:String  = localStorage.getItem("uiduser")
   var movieId = item;
   var value = item.note
   var keymovi=item.$key
    


   this.starserv.getItem(item).subscribe(items =>{
    this.objectItem = items.value;
   console.log(typeof(items))
    console.log(this.objectItem)
    console.log(item.note)
  })

 
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


    if(userId==null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'vous devez connecter pour voter',
        footer: '<a href="/signup"> go to register page  </a>'
      })
    }  
    else if(item.note == this.objectItem) {

      console.log(userId)

      const star: Star ={ 
        userId, 
        movieId, 
        value
      }

      const pathst = star.userId+'/'+keymovi
      
      
      this.afs.doc(pathst).set(star)

      
    


    }
 

  }
  



  ngOnInit() {

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
