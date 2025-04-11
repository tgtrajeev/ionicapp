import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateDispenserMgtPageRoutingModule } from './add-update-dispenser-mgt-routing.module';

import { AddUpdateDispenserMgtPage } from './add-update-dispenser-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateDispenserMgtPageRoutingModule
  ],
  declarations: [AddUpdateDispenserMgtPage]
})
export class AddUpdateDispenserMgtPageModule {}
