import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardMoPage } from './dashboard-mo.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardMoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardMoPageRoutingModule {}
