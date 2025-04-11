import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaSummaryPreviewModalPage } from './dsa-summary-preview-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DsaSummaryPreviewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaSummaryPreviewModalPageRoutingModule {}
