import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentManagementPageRoutingModule } from './payment-management-routing.module';

import { PaymentManagementPage } from './payment-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentManagementPageRoutingModule
  ],
  declarations: [PaymentManagementPage]
})
export class PaymentManagementPageModule {}
