import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MOStationStatusPage } from './mostation-status.page';

const routes: Routes = [
  {
    path: '',
    component: MOStationStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MOStationStatusPageRoutingModule {}
