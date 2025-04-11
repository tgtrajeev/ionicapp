import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaEntryDetailPage } from './dsa-entry-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DsaEntryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaEntryDetailPageRoutingModule {}
