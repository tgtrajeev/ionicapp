import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailPopupStationMgtPageRoutingModule } from './add-detail-popup-station-mgt-routing.module';

import { AddDetailPopupStationMgtPage } from './add-detail-popup-station-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetailPopupStationMgtPageRoutingModule
  ],
  declarations: [AddDetailPopupStationMgtPage]
})
export class AddDetailPopupStationMgtPageModule {}
