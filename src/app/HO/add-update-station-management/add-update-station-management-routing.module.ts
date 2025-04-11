import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateStationManagementPage } from './add-update-station-management.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateStationManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateStationManagementPageRoutingModule { }
