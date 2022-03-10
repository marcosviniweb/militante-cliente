import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsgrecPage } from './msgrec.page';

const routes: Routes = [
  {
    path: '',
    component: MsgrecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsgrecPageRoutingModule {}
