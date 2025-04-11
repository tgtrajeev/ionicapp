import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryDsaPageRoutingModule } from './summary-dsa-routing.module';

import { SummaryDsaPage } from './summary-dsa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryDsaPageRoutingModule
  ],
  declarations: [SummaryDsaPage]
})
export class SummaryDsaPageModule {}
