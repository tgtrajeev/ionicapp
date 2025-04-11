import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailRegionmgtPageRoutingModule } from './add-detail-regionmgt-routing.module';

import { AddDetailRegionmgtPage } from './add-detail-regionmgt.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddDetailRegionmgtPageRoutingModule
  ],
  declarations: [AddDetailRegionmgtPage]
})
export class AddDetailRegionmgtPageModule {}
