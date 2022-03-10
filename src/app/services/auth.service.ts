import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';


export interface Senha {
  email?: string,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user: User, register: User){
  return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  register(user: User){
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);

  }
  esqueceusenha(email: string){
    return this.afa.auth.sendPasswordResetEmail(email);
  }
  logout(){
   

    return  this.afa.auth.signOut();

  }


  getAuth(){
    return this.afa.auth; 
  }

  
}
