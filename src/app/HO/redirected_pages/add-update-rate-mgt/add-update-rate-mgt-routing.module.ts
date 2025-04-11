import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateRateMgtPage } from './add-update-rate-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateRateMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateRateMgtPageRoutingModule {}
