import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateGasGensetPageRoutingModule } from './add-update-gas-genset-routing.module';

import { AddUpdateGasGensetPage } from './add-update-gas-genset.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateGasGensetPageRoutingModule
  ],
  declarations: [AddUpdateGasGensetPage]
})
export class AddUpdateGasGensetPageModule {}
