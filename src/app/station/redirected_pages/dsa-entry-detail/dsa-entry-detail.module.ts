import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaEntryDetailPageRoutingModule } from './dsa-entry-detail-routing.module';

import { DsaEntryDetailPage } from './dsa-entry-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DsaEntryDetailPageRoutingModule
  ],
  declarations: [DsaEntryDetailPage]
})
export class DsaEntryDetailPageModule {}
