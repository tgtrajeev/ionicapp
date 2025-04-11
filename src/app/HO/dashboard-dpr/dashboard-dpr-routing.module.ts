import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDprPage } from './dashboard-dpr.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDprPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDprPageRoutingModule {}
