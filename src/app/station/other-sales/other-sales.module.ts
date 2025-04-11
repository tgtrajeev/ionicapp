import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherSalesPageRoutingModule } from './other-sales-routing.module';

import { OtherSalesPage } from './other-sales.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    OtherSalesPageRoutingModule
  ],
  declarations: [OtherSalesPage]
})
export class OtherSalesPageModule {}
