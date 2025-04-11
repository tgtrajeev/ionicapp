import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispenserManagementPage } from './dispenser-management.page';

const routes: Routes = [
  {
    path: '',
    component: DispenserManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispenserManagementPageRoutingModule {}
