import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaReportMgtPageRoutingModule } from './dsa-report-mgt-routing.module';

import { DsaReportMgtPage } from './dsa-report-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DsaReportMgtPageRoutingModule
  ],
  declarations: [DsaReportMgtPage]
})
export class DsaReportMgtPageModule {}
