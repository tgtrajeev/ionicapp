import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeResetMeterSkidPage } from './change-reset-meter-skid.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeResetMeterSkidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeResetMeterSkidPageRoutingModule {}
