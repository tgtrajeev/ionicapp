import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenralEntryPage } from './genral-entry.page';

const routes: Routes = [
  {
    path: '',
    component: GenralEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenralEntryPageRoutingModule {}
