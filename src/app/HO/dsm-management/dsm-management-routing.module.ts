import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsmManagementPage } from './dsm-management.page';

const routes: Routes = [
  {
    path: '',
    component: DsmManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsmManagementPageRoutingModule {}
