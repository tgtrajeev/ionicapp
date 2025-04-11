import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DprReportMgtPage } from './dpr-report-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: DprReportMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DprReportMgtPageRoutingModule {}
