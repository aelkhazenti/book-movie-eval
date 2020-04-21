import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"


import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage'
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'

import {Router} from '@angular/router'
import { Observable} from 'rxjs';
import {finalize, tap}from 'rxjs/operators'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  stars : Observable<any>
  avgRating:Observable<any>
  

  itemFilme :AngularFireList<any>; 
  itemLivre :AngularFireList<any>; 
  itemArraLivre=[]
  itemList :AngularFireList<any>;
readonlyforme = false;
  
  readonly = true;
  
  itemArra=[]


 
   constructor(private afStorage: AngularFireStorage,public db:AngularFireDatabase,public router:Router,private afs: AngularFirestore) { 
    
    this.itemFilme = db.list('filme')
    this.itemLivre = db.list('livre')
    this.itemList = db.list('stars')
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

   var userId:String  = localStorage.getItem("uiduser")
   var movieId = item;
   var value = item.note

  var keymovi=item.$key
  console.log(keymovi)
    if(userId==null){
alert("vous devez connecter ")
    }else{
      console.log(userId)
      const star: Star ={ userId, movieId, value }

      // Custom doc ID for relationship
      const starPath = `stars/${star.userId}/${keymovi}`;
  
      const pathst = star.userId+'/'+keymovi
      // Set the data, return the promise
      return this.afs.doc(pathst).set(star)


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
