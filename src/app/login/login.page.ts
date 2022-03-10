import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavController, IonSlides } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import {  MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  public wavesPosition: number = 0;
  
  private wavesDifference: number = 100;
    public userLogin: User = {};
   public userRegister: User = {};
   private loading: any;
  
   ngOnInit() {
   }
   ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
    constructor(
      private menuCtrl: MenuController,
      private router: Router,
      private authService: AuthService,
      private afa: AngularFireAuth,
      private afs: AngularFirestore,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private nav: NavController,
  
    ) { }
    segmentChanged(event: any) {
      if (event.detail.value === 'login') {
        this.slides.slidePrev();
        this.wavesPosition += this.wavesDifference;
      } else {
        this.slides.slideNext();
        this.wavesPosition -= this.wavesDifference;
      }
    }
  
    async register() {
  
  
  
      await this.presentLoading();
  
      try {
  
       const novoUsuario =  await this.afa.auth.createUserWithEmailAndPassword(this.userRegister.email, this.userRegister.password);
       this.userRegister.id = novoUsuario.user.uid;
       let dia = new Date().getTime().toString();
       this.userRegister.criacao = new Date().toString();
       //this.userRegister.criacao = dia;
       await this.afs.collection('Usuários').doc(   this.userRegister.id ).set(this.userRegister);
  
       this.nav.navigateForward(['home/']);
  
  
      } catch (error) {
        console.error(error);
           let message: string;
        switch(error.code){
          case 'auth/email-already-in-use':
          message = ' E-mail sendo usado!';
              break;
              case 'auth/invalid-email':
              message = ' E-mail inválido!';
                  break;
                  case 'auth/weak-password':
                  message = ' Senha pequena, digite uma senha maior ou igual a 6 caracteres';
                      break;
        }
  this.presentToast(message);
  
      } finally {
        this.loading.dismiss();
      }
    }
  
    async login() {
       await this.presentLoading();
  
       try {
         await this.authService.login(this.userLogin,this.userRegister);
         var userId = this.authService.getAuth().currentUser.uid;
         this.nav.navigateForward(['home/']);
  
  
       } catch (error) {
         console.error(error);
           let message: string;
         switch(error.code){
           case 'auth/user-not-found':
           message = ' Usuário não cadastrado!';
               break;
               case 'auth/wrong-password':
               message = 'Senha incorreta para esse usuário! ';
                   break;
                   case 'auth/too-many-requests':
                  message = 'Você tentou entrar muitas vezes sem sucesso, por favor tente mais tarde! ';
                      break;
                 }
         this.presentToast(message);
       } finally {
         this.loading.dismiss();
       }
     }
     async presentLoading() {
     this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
     return this.loading.present();
   }
  
   async presentToast(message: string) {
     const toast = await this.toastCtrl.create({ message, duration: 3000 });
     toast.present();
   }
  
   senha(){
     this.router.navigateByUrl("/senha");
   }
  
  }
  