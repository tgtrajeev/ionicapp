import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationManagementPage } from './station-management.page';

const routes: Routes = [
  {
    path: '',
    component: StationManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationManagementPageRoutingModule {}
