import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardCOPage } from './dashboard-co.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardCOPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardCOPageRoutingModule {}
