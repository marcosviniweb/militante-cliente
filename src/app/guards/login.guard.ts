import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  public userRegister: User = {};
  constructor(
    private authService: AuthService,
    private router: Router,
    private nav: NavController,
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if (user)      this.nav.navigateForward(['home/']);

        resolve(!user ? true : false);
      });
    });
  }
}
