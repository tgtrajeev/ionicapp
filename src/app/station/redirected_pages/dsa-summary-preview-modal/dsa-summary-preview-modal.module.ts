import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaSummaryPreviewModalPageRoutingModule } from './dsa-summary-preview-modal-routing.module';

import { DsaSummaryPreviewModalPage } from './dsa-summary-preview-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DsaSummaryPreviewModalPageRoutingModule
  ],
  declarations: [DsaSummaryPreviewModalPage]
})
export class DsaSummaryPreviewModalPageModule {}
