import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StationStatusPageRoutingModule } from './station-status-routing.module';

import { StationStatusPage } from './station-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StationStatusPageRoutingModule
  ],
  declarations: [StationStatusPage]
})
export class StationStatusPageModule {}
