import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegionMgtPage } from './region-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: RegionMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegionMgtPageRoutingModule {}
