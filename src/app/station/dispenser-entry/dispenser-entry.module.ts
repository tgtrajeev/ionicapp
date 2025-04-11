import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispenserEntryPageRoutingModule } from './dispenser-entry-routing.module';

import { DispenserEntryPage } from './dispenser-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispenserEntryPageRoutingModule
  ],
  declarations: [DispenserEntryPage]
})
export class DispenserEntryPageModule {}
