import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispenserEntryPage } from './dispenser-entry.page';

const routes: Routes = [
  {
    path: '',
    component: DispenserEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispenserEntryPageRoutingModule {}
