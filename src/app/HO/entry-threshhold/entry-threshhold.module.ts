import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryThreshholdPageRoutingModule } from './entry-threshhold-routing.module';

import { EntryThreshholdPage } from './entry-threshhold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryThreshholdPageRoutingModule
  ],
  declarations: [EntryThreshholdPage]
})
export class EntryThreshholdPageModule {}
