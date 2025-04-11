import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdatePaymentMgtPage } from './add-update-payment-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdatePaymentMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdatePaymentMgtPageRoutingModule {}
