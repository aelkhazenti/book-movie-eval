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

  uid_user:String;
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
     async facebookSignin() {
      
      const provider = new auth.FacebookAuthProvider
      
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
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
  
      localStorage.setItem("uiduser",user.uid)
      localStorage.setItem("uiduseSSr",user.photoURL)
      return userRef.set(data, { merge: true })
  
    }
  
    async signOut() {
      localStorage.removeItem("uiduser")
      localStorage.removeItem("uiduseSSr")
      await this.afAuth.signOut();
      

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

        
    }



    async loginwhithemailandpass(email,mdp){
      await this.afAuth.signInWithEmailAndPassword(email,mdp)
      const credential =  await this.afAuth.signInWithEmailAndPassword(email,mdp)


      localStorage.setItem("uiduser",credential.user.uid)
      this.setuser(credential.user)
       this.router.navigate(['/'])
      
    }
    

    getuser(){
      console.log("adadad  "+this.uid_user)
      return this.uid_user
    }

setuser(user){
  this.uid_user=user.uid
}
    

}