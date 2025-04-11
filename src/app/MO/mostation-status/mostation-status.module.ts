import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MOStationStatusPageRoutingModule } from './mostation-status-routing.module';

import { MOStationStatusPage } from './mostation-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MOStationStatusPageRoutingModule
  ],
  declarations: [MOStationStatusPage]
})
export class MOStationStatusPageModule {}
