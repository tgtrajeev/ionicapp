import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeResetMeterSkidPageRoutingModule } from './change-reset-meter-skid-routing.module';

import { ChangeResetMeterSkidPage } from './change-reset-meter-skid.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ChangeResetMeterSkidPageRoutingModule
  ],
  declarations: [ChangeResetMeterSkidPage]
})
export class ChangeResetMeterSkidPageModule {}
