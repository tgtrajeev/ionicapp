import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoDashboardPage } from './mo-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MoDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoDashboardPageRoutingModule {}
