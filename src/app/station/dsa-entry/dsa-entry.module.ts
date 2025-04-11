import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaEntryPageRoutingModule } from './dsa-entry-routing.module';

import { DsaEntryPage } from './dsa-entry.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DsaEntryPageRoutingModule
  ],
  declarations: [DsaEntryPage]
})
export class DsaEntryPageModule {}
