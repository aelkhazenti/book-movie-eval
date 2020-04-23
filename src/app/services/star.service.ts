import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable()
export class StarService {

itemcollection : AngularFirestoreCollection<Item>
item : Observable<Item[]>

  constructor(private afs: AngularFirestore) {     
    
  }


  getitems(item){
    const userId:String  = localStorage.getItem("uiduser")
    var keymovi=item.$key
    const pathst = userId+'/'+keymovi
    

    return this.item;
  }


}
export interface Item { 
  uid : String,
  email : String,
  displayName?: String,
  photoURL?: String,
  nom?:String,
  prenom?:String,
}

