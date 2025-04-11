import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegionMgtPageRoutingModule } from './region-mgt-routing.module';

import { RegionMgtPage } from './region-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegionMgtPageRoutingModule
  ],
  declarations: [RegionMgtPage]
})
export class RegionMgtPageModule {}
