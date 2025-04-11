import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateGasGensetPage } from './add-update-gas-genset.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateGasGensetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateGasGensetPageRoutingModule {}
