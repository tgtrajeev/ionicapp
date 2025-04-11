import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryDSAReportPage } from './summary-dsareport.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryDSAReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryDSAReportPageRoutingModule {}
