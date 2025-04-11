import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MOStationDetailPage } from './mostation-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MOStationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MOStationDetailPageRoutingModule {}
