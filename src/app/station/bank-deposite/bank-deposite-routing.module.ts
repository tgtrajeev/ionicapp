import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankDepositePage } from './bank-deposite.page';

const routes: Routes = [
  {
    path: '',
    component: BankDepositePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankDepositePageRoutingModule {}
