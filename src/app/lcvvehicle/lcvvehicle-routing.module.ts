import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LCVvehiclePage } from './lcvvehicle.page';

const routes: Routes = [
  {
    path: '',
    component: LCVvehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LCVvehiclePageRoutingModule {}
