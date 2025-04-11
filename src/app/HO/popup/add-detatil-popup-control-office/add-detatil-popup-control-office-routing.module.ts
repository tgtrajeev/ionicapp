import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetatilPopupControlOfficePage } from './add-detatil-popup-control-office.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetatilPopupControlOfficePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetatilPopupControlOfficePageRoutingModule {}
