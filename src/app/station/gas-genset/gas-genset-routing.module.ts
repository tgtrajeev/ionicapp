import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasGensetPage } from './gas-genset.page';

const routes: Routes = [
  {
    path: '',
    component: GasGensetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasGensetPageRoutingModule {}
