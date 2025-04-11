import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaSummaryPageRoutingModule } from './dsa-summary-routing.module';

import { DsaSummaryPage } from './dsa-summary.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DsaSummaryPageRoutingModule
  ],
  declarations: [DsaSummaryPage]
})
export class DsaSummaryPageModule {}
