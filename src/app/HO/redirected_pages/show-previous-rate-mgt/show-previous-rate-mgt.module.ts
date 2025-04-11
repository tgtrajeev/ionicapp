import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowPreviousRateMgtPageRoutingModule } from './show-previous-rate-mgt-routing.module';

import { ShowPreviousRateMgtPage } from './show-previous-rate-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowPreviousRateMgtPageRoutingModule
  ],
  declarations: [ShowPreviousRateMgtPage]
})
export class ShowPreviousRateMgtPageModule {}
