import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherSalesPage } from './other-sales.page';

const routes: Routes = [
  {
    path: '',
    component: OtherSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherSalesPageRoutingModule {}
