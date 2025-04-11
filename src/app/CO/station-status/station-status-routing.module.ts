import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationStatusPage } from './station-status.page';

const routes: Routes = [
  {
    path: '',
    component: StationStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationStatusPageRoutingModule {}
