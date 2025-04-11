import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DprDispenserEntryPage } from './dpr-dispenser-entry.page';

const routes: Routes = [
  {
    path: '',
    component: DprDispenserEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DprDispenserEntryPageRoutingModule {}
