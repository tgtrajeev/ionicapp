import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasGensetPageRoutingModule } from './gas-genset-routing.module';

import { GasGensetPage } from './gas-genset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GasGensetPageRoutingModule
  ],
  declarations: [GasGensetPage]
})
export class GasGensetPageModule {}
