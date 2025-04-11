import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LCVvehiclePageRoutingModule } from './lcvvehicle-routing.module';

import { LCVvehiclePage } from './lcvvehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LCVvehiclePageRoutingModule
  ],
  declarations: [LCVvehiclePage]
})
export class LCVvehiclePageModule {}
