import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DprSortingPage } from './dpr-sorting.page';

const routes: Routes = [
  {
    path: '',
    component: DprSortingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DprSortingPageRoutingModule {}
