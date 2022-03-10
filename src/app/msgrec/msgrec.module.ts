import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsgrecPageRoutingModule } from './msgrec-routing.module';

import { MsgrecPage } from './msgrec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsgrecPageRoutingModule
  ],
  declarations: [MsgrecPage]
})
export class MsgrecPageModule {}
