import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprDispenserEntryPageRoutingModule } from './dpr-dispenser-entry-routing.module';

import { DprDispenserEntryPage } from './dpr-dispenser-entry.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DprDispenserEntryPageRoutingModule
  ],
  declarations: [DprDispenserEntryPage]
})
export class DprDispenserEntryPageModule {}
