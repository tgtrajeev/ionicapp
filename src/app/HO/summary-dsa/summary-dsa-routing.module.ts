import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryDsaPage } from './summary-dsa.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryDsaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryDsaPageRoutingModule {}
