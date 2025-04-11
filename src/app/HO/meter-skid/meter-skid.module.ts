import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeterSkidPageRoutingModule } from './meter-skid-routing.module';

import { MeterSkidPage } from './meter-skid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeterSkidPageRoutingModule
  ],
  declarations: [MeterSkidPage]
})
export class MeterSkidPageModule {}
