import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateEntryThreshholdPageRoutingModule } from './add-update-entry-threshhold-routing.module';

import { AddUpdateEntryThreshholdPage } from './add-update-entry-threshhold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    AddUpdateEntryThreshholdPageRoutingModule
  ],
  declarations: [AddUpdateEntryThreshholdPage]
})
export class AddUpdateEntryThreshholdPageModule {}
