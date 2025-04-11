import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaReportMgtPage } from './dsa-report-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: DsaReportMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaReportMgtPageRoutingModule {}
