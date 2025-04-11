import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoDashboardPage } from './so-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: SoDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoDashboardPageRoutingModule {}
