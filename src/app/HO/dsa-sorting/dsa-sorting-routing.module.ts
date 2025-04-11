import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DsaSortingPage } from './dsa-sorting.page';

const routes: Routes = [
  {
    path: '',
    component: DsaSortingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsaSortingPageRoutingModule {}
