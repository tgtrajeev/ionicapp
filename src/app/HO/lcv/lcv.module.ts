import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LcvPageRoutingModule } from './lcv-routing.module';

import { LcvPage } from './lcv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LcvPageRoutingModule
  ],
  declarations: [LcvPage]
})
export class LcvPageModule {}
