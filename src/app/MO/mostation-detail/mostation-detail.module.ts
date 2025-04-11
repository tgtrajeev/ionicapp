import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MOStationDetailPageRoutingModule } from './mostation-detail-routing.module';

import { MOStationDetailPage } from './mostation-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MOStationDetailPageRoutingModule
  ],
  declarations: [MOStationDetailPage]
})
export class MOStationDetailPageModule {}
