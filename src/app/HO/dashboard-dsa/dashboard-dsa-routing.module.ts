import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDsaPage } from './dashboard-dsa.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDsaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDsaPageRoutingModule {}
