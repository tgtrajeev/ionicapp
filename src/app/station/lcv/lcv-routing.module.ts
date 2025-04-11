import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LcvPage } from './lcv.page';

const routes: Routes = [
  {
    path: '',
    component: LcvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LcvPageRoutingModule {}
