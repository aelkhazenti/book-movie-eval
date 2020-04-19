import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"


import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage'
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'

import {Router} from '@angular/router'
import { Observable} from 'rxjs';
import {finalize, tap}from 'rxjs/operators'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  itemFilme :AngularFireList<any>; 
  itemLivre :AngularFireList<any>; 
  itemArraLivre=[]


  
  readonly = false;
  selected = 8;
  itemArra=[
    

  ]

 
   constructor(private afStorage: AngularFireStorage,public db:AngularFireDatabase,public router:Router) { 
    
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