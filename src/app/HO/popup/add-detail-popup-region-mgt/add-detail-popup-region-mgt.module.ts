import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailPopupRegionMgtPageRoutingModule } from './add-detail-popup-region-mgt-routing.module';

import { AddDetailPopupRegionMgtPage } from './add-detail-popup-region-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetailPopupRegionMgtPageRoutingModule
  ],
  declarations: [AddDetailPopupRegionMgtPage]
})
export class AddDetailPopupRegionMgtPageModule {}
