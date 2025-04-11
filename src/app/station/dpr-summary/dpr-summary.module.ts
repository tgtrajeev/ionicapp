import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprSummaryPageRoutingModule } from './dpr-summary-routing.module';

import { DprSummaryPage } from './dpr-summary.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DprSummaryPageRoutingModule
  ],
  declarations: [DprSummaryPage]
})
export class DprSummaryPageModule {}
