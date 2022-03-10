import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagemPageRoutingModule } from './messagem-routing.module';

import { MessagemPage } from './messagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagemPageRoutingModule
  ],
  declarations: [MessagemPage]
})
export class MessagemPageModule {}
