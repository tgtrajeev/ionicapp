import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeterSkidPopupPage } from './meter-skid-popup.page';

const routes: Routes = [
  {
    path: '',
    component: MeterSkidPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeterSkidPopupPageRoutingModule {}
