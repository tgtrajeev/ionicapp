import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentManagementPage } from './payment-management.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentManagementPageRoutingModule {}
