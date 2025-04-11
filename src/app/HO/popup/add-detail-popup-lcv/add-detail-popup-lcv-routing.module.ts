import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetailPopupLcvPage } from './add-detail-popup-lcv.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetailPopupLcvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetailPopupLcvPageRoutingModule {}
