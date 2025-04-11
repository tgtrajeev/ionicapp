import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeResetLcvPage } from './change-reset-lcv.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeResetLcvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeResetLcvPageRoutingModule {}
