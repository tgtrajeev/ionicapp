import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RejectStationDprPageRoutingModule } from './reject-station-dpr-routing.module';

import { RejectStationDprPage } from './reject-station-dpr.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RejectStationDprPageRoutingModule
  ],
  declarations: [RejectStationDprPage]
})
export class RejectStationDprPageModule {}
