import { Injectable } from '@angular/core';
import { User } from './user.model'; 
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})
export class SercheService {

  constructor(public afs:AngularFirestore, ) { }


  getmovie() {

 
    return this.afs.collection<User>(`users`).valueChanges();

  }



}
