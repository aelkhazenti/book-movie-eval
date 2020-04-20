import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model'; 

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {

      // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )

     }


     async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }
  
    private updateUserData(user) {
    
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL
      } 
  
      return userRef.set(data, { merge: true })
  
    }
  
    async signOut() {
      await this.afAuth.signOut();

      // console.log
      // this.router.navigate(['homecontent'])
    }

   async loginWithemail(email,mdp,username,imgURL){

  const credential = await this.afAuth.signInWithEmailAndPassword(email,mdp)
  console.log(username+" "+imgURL)
  return this.updateUser(credential.user,username,imgURL)
  


    }

    private updateUser(user,username,imgURL){
          
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: username, 
        photoURL: imgURL
      } 
  
      return userRef.set(data, { merge: true })

        this.router.navigate(['/'])
    }



    async loginwhithemailandpass(email,mdp){
       await this.afAuth.signInWithEmailAndPassword(email,mdp)

       this.router.navigate(['/'])
      
    }
    



    

}