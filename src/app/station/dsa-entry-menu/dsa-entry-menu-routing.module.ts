import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaEntryMenuPage } from './dsa-entry-menu.page';

const routes: Routes = [
  {
    path: '',
    component: DsaEntryMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaEntryMenuPageRoutingModule {}
