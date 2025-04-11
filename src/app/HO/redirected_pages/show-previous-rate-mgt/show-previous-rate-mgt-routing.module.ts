import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowPreviousRateMgtPage } from './show-previous-rate-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPreviousRateMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowPreviousRateMgtPageRoutingModule {}
