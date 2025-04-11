import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCollectionPageRoutingModule } from './payment-collection-routing.module';

import { PaymentCollectionPage } from './payment-collection.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PaymentCollectionPageRoutingModule
  ],
  declarations: [PaymentCollectionPage]
})
export class PaymentCollectionPageModule {}
