import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MODsmManagementPage } from './modsm-management.page';

const routes: Routes = [
  {
    path: '',
    component: MODsmManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MODsmManagementPageRoutingModule {}
