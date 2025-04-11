import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaSummaryPage } from './dsa-summary.page';

const routes: Routes = [
  {
    path: '',
    component: DsaSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaSummaryPageRoutingModule {}
