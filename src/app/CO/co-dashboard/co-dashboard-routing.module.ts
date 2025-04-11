import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoDashboardPage } from './co-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CoDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoDashboardPageRoutingModule {}
