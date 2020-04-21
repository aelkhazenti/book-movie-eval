import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2"


import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage'
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'

import {Router} from '@angular/router'
import { Observable} from 'rxjs';
import {finalize, tap}from 'rxjs/operators'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

percentage: Observable<number>;
tasksnap :UploadTaskSnapshot;

itemArra = []
itemArraLivre= []
items : Observable<any[]>;
itemFilme :AngularFireList<any>; 
itemLivre :AngularFireList<any>; 
snapshot: Observable<any>;
urlimage : Observable<string>

Itemtype :String

data = {

  nomfilme : '',
  durefilm : '',
  datesortie : '',
  director : '',
  type : '',
  categorie : '', 
  urlimage :'',
  nomlivre:'',
  nomauteur:'',
  dateparu:'',
  nbrpage:'',
  note:0,
  nbrVote:0,

}



    itsBook = true;
    model: NgbDateStruct;
    


  constructor(private afStorage: AngularFireStorage,public db:AngularFireDatabase,public router:Router) { 
    
    this.itemFilme = db.list('filme')
    this.itemLivre = db.list('livre')

    this.itemArra=[]
   
    
        this.itemFilme = this.db.list('/filme')
    
        this.itemFilme.snapshotChanges().subscribe(actions=>{
          actions.forEach(Action=>{
           let y=  Action.payload.toJSON()
            y['$key']= Action.key
            this.itemArra.push(y as listfilm) 
          })
        })

this.itemArraLivre=[]

this.itemLivre = this.db.list('/livre')

this.itemLivre.snapshotChanges().subscribe(actions=>{
  actions.forEach(Action=>{
    let liv=  Action.payload.toJSON()
    liv['$key']= Action.key
    this.itemArraLivre.push(liv as listlivre)

  })
})



  }
  changeItem(event){
    this.Itemtype = event.target.value;

    console.log(this.Itemtype)


    if(this.Itemtype=="Filme"){
      this.itsBook = false

      console.log("its book valur "+this.itsBook)


    }else{
      
      this.itsBook = true
      console.log("its book"+this.itsBook)
    }
  }
  upload(event){

    if(this.Itemtype=="Filme"){
      const randomId = Math.random().toString(36).substring(2);
      const file = event.target.files[0];
      const filepath = "filme/"+randomId;
      const refe = this.afStorage.ref(filepath);
      const tasks = this.afStorage.upload(filepath , file)
      this.percentage = tasks.percentageChanges();
      tasks.snapshotChanges().pipe(finalize(() => this.urlimage = refe.getDownloadURL())).subscribe()
    }else{
      const randomId = Math.random().toString(36).substring(2);
      const file = event.target.files[0];
      const filepath = "Livre/"+randomId;
      const refe = this.afStorage.ref(filepath);
      const tasks = this.afStorage.upload(filepath , file)
      this.percentage = tasks.percentageChanges();
      tasks.snapshotChanges().pipe(finalize(() => this.urlimage = refe.getDownloadURL())).subscribe()
    }
 
    let timerInterval
Swal.fire({
  title: 'Auto close alert!',
  html: 'I will close in <b></b> milliseconds.',
  timer: 10000,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
       
      }
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})

  }

  serche(){

    if(this.Itemtype=="Filme"){
    var isduplicate =false

    for (let itemF of this.itemArra){
       if(itemF.nomfilme== this.data.nomfilme){
         isduplicate = true
          break ;
      }
      else{
        
      }
    }

if(isduplicate==true){
  Swal.fire({
    icon: 'error',
    title: 'dublicated',
    text: 'votre nom de Film est duplicet ',
  })

}else{
  this.insertItem()
}

}

else{

  var isduplicate =false

  for (let itemL of this.itemArraLivre ){
     if(itemL.nomlivre== this.data.nomlivre){
       isduplicate = true
        break ;
    }
    else{
      
    }
  }

if(isduplicate==true){
Swal.fire({
  icon: 'error',
  title: 'dublicated',
  text: 'votre nom de LIvre est duplicet ',
})

}else{
this.insertItem()
}


}
  
    
  }

  insertItem(){

 
    

    

    if(this.Itemtype=="Filme"){
      this.itemFilme.push({
        nomfilme : this.data.nomfilme,
        categorie : this.data.categorie,
        datesortie : this.data.datesortie,
        director : this.data.director,
        durefilm : this.data.durefilm,
        type : this.data.type,
        urlimage : this.data.urlimage, 
        note:this.data.note,
        nbrvote:this.data.nbrVote       
      })
    }
    else{

      this.itemLivre.push({
        nomlivre : this.data.nomlivre,
        nomauteur : this.data.nomauteur,
        dateparu : this.data.dateparu,
        nbrpage : this.data.nbrpage,
        type : this.data.type,
        urlimage : this.data.urlimage,        
        categorie : this.data.categorie,
        note:this.data.note,
        nbrvote:this.data.nbrVote
      })

    }


Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
  
this.router.navigate(['/'])

  }


  ngOnInit() {
  }


  isallinsert(){
    if(this.Itemtype=="Filme"){
      if(this.data.nomfilme === '' || this.data.categorie=== '' || this.data.director === '' || this.data.durefilm === '' || this.data.type === '' || this.data.urlimage === '' || this.data.datesortie == 'function Date() { [native code] }' || this.data.datesortie == ''  ){
        Swal.fire({
        icon: 'error',
        title: 'erreur',
        text: 'vous devez remplir tous les information ',
        })

        console.log(this.data)
}else{

this.serche()
    }
   
  }
  else{
    if(this.data.nomlivre === '' || this.data.nomauteur=== '' || this.data.nbrpage === '' || this.data.type === '' || this.data.urlimage === '' || this.data.dateparu == 'function Date() { [native code] }' || this.data.dateparu == '' || this.data.categorie === '' ){
      Swal.fire({
        icon: 'error',
        title: 'erreur',
        text: 'vous devez remplir tous les information ',
        })

        console.log(this.data)
    }else{
      this.serche()
    }
  }
  
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

}