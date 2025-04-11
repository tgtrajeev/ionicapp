import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdatePaymentMgtPageRoutingModule } from './add-update-payment-mgt-routing.module';

import { AddUpdatePaymentMgtPage } from './add-update-payment-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    AddUpdatePaymentMgtPageRoutingModule
  ],
  declarations: [AddUpdatePaymentMgtPage]
})
export class AddUpdatePaymentMgtPageModule {}
