import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailPopupLcvPageRoutingModule } from './add-detail-popup-lcv-routing.module';

import { AddDetailPopupLcvPage } from './add-detail-popup-lcv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetailPopupLcvPageRoutingModule
  ],
  declarations: [AddDetailPopupLcvPage]
})
export class AddDetailPopupLcvPageModule {}
