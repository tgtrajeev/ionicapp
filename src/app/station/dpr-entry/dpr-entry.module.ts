import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprEntryPageRoutingModule } from './dpr-entry-routing.module';

import { DprEntryPage } from './dpr-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DprEntryPageRoutingModule
  ],
  declarations: [DprEntryPage]
})
export class DprEntryPageModule {}
