import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeResetGesGensetPage } from './change-reset-ges-genset.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeResetGesGensetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeResetGesGensetPageRoutingModule {}
