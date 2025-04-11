import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailPopupDispenserMgtPageRoutingModule } from './add-detail-popup-dispenser-mgt-routing.module';

import { AddDetailPopupDispenserMgtPage } from './add-detail-popup-dispenser-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetailPopupDispenserMgtPageRoutingModule
  ],
  declarations: [AddDetailPopupDispenserMgtPage]
})
export class AddDetailPopupDispenserMgtPageModule {}
