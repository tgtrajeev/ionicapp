import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateEntryThreshholdPage } from './add-update-entry-threshhold.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateEntryThreshholdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateEntryThreshholdPageRoutingModule {}
