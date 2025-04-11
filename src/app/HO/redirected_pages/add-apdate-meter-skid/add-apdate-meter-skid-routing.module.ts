import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddApdateMeterSkidPage } from './add-apdate-meter-skid.page';

const routes: Routes = [
  {
    path: '',
    component: AddApdateMeterSkidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddApdateMeterSkidPageRoutingModule {}
