import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeterSkidPage } from './meter-skid.page';

const routes: Routes = [
  {
    path: '',
    component: MeterSkidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeterSkidPageRoutingModule {}
