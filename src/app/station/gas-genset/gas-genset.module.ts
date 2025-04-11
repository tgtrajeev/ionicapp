import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasGensetPageRoutingModule } from './gas-genset-routing.module';

import { GasGensetPage } from './gas-genset.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    GasGensetPageRoutingModule
  ],
  declarations: [GasGensetPage]
})
export class GasGensetPageModule {}
