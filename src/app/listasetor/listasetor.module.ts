import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListasetorPageRoutingModule } from './listasetor-routing.module';

import { ListasetorPage } from './listasetor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListasetorPageRoutingModule
  ],
  declarations: [ListasetorPage]
})
export class ListasetorPageModule {}
