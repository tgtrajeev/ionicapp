import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateDispenserMgtPage } from './add-update-dispenser-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateDispenserMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateDispenserMgtPageRoutingModule {}
