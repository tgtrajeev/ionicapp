import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailPopupDsmMgtPageRoutingModule } from './add-detail-popup-dsm-mgt-routing.module';

import { AddDetailPopupDsmMgtPage } from './add-detail-popup-dsm-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetailPopupDsmMgtPageRoutingModule
  ],
  declarations: [AddDetailPopupDsmMgtPage]
})
export class AddDetailPopupDsmMgtPageModule {}
