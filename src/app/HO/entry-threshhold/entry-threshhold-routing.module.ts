import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryThreshholdPage } from './entry-threshhold.page';

const routes: Routes = [
  {
    path: '',
    component: EntryThreshholdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryThreshholdPageRoutingModule {}
