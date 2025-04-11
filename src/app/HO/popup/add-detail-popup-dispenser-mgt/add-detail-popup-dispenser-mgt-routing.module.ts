import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetailPopupDispenserMgtPage } from './add-detail-popup-dispenser-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetailPopupDispenserMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetailPopupDispenserMgtPageRoutingModule {}
