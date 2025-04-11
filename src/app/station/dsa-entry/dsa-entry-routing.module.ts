import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaEntryPage } from './dsa-entry.page';

const routes: Routes = [
  {
    path: '',
    component: DsaEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaEntryPageRoutingModule {}
