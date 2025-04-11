import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DprSummaryPage } from './dpr-summary.page';

const routes: Routes = [
  {
    path: '',
    component: DprSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DprSummaryPageRoutingModule {}
