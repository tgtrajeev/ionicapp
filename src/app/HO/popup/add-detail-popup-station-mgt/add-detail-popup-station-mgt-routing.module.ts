import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetailPopupStationMgtPage } from './add-detail-popup-station-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetailPopupStationMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetailPopupStationMgtPageRoutingModule {}
