import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagemPage } from './messagem.page';

const routes: Routes = [
  {
    path: '',
    component: MessagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagemPageRoutingModule {}
