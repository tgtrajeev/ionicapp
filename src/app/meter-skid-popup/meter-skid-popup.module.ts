import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeterSkidPopupPageRoutingModule } from './meter-skid-popup-routing.module';

import { MeterSkidPopupPage } from './meter-skid-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeterSkidPopupPageRoutingModule
  ],
  declarations: [MeterSkidPopupPage]
})
export class MeterSkidPopupPageModule {}
