import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankDepositePageRoutingModule } from './bank-deposite-routing.module';

import { BankDepositePage } from './bank-deposite.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    BankDepositePageRoutingModule
  ],
  declarations: [BankDepositePage]
})
export class BankDepositePageModule {}
