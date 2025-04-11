import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaDispenserEntryPage } from './dsa-dispenser-entry.page';

const routes: Routes = [
  {
    path: '',
    component: DsaDispenserEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaDispenserEntryPageRoutingModule {}
