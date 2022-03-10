import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'home', loadChildren: './home/home.module#HomePageModule',canActivate: [AuthGuard]  },
   { path: 'home/:id', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard]  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard]  },
  {
    path: 'messagem',
    loadChildren: () => import('./messagem/messagem.module').then( m => m.MessagemPageModule)
  },
  {
    path: 'listasetor',
    loadChildren: () => import('./listasetor/listasetor.module').then( m => m.ListasetorPageModule)
  },
  {
    path: 'msgrec',
    loadChildren: () => import('./msgrec/msgrec.module').then( m => m.MsgrecPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
