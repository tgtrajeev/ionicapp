import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprReportMgtPageRoutingModule } from './dpr-report-mgt-routing.module';

import { DprReportMgtPage } from './dpr-report-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DprReportMgtPageRoutingModule
  ],
  declarations: [DprReportMgtPage]
})
export class DprReportMgtPageModule {}
