import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaDispenserEntryPageRoutingModule } from './dsa-dispenser-entry-routing.module';

import { DsaDispenserEntryPage } from './dsa-dispenser-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DsaDispenserEntryPageRoutingModule
  ],
  declarations: [DsaDispenserEntryPage]
})
export class DsaDispenserEntryPageModule {}
