import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListasetorPage } from './listasetor.page';

const routes: Routes = [
  {
    path: '',
    component: ListasetorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListasetorPageRoutingModule {}
