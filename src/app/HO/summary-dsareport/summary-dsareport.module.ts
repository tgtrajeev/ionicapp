import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryDSAReportPageRoutingModule } from './summary-dsareport-routing.module';

import { SummaryDSAReportPage } from './summary-dsareport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    SummaryDSAReportPageRoutingModule
  ],
  declarations: [SummaryDSAReportPage]
})
export class SummaryDSAReportPageModule {}
