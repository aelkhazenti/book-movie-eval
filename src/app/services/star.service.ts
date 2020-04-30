import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StarService {


  itemCollection : AngularFirestoreCollection<Star>;
  item:Observable<any>;
  
  constructor(public afs :AngularFirestore) { }


  getItem(item){
    
    const userId:String  = localStorage.getItem("uiduser");
    var keymovi=item.$key;
    console.log(userId)
    const pathst = userId+'/'+keymovi


    this.item = this.afs.doc(pathst).valueChanges();

    return this.item;
  }



}

export interface Star {
  userId: String;
  movieId: any;
  value: number;

}
