import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DprEntryPage } from './dpr-entry.page';

const routes: Routes = [
  {
    path: '',
    component: DprEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DprEntryPageRoutingModule {}
