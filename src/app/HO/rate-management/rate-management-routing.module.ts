import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateManagementPage } from './rate-management.page';

const routes: Routes = [
  {
    path: '',
    component: RateManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateManagementPageRoutingModule {}
