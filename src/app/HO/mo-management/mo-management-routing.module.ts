import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MOManagementPage } from './mo-management.page';

const routes: Routes = [
  {
    path: '',
    component: MOManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MOManagementPageRoutingModule {}
