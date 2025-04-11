import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispenserManagementPageRoutingModule } from './dispenser-management-routing.module';

import { DispenserManagementPage } from './dispenser-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispenserManagementPageRoutingModule
  ],
  declarations: [DispenserManagementPage]
})
export class DispenserManagementPageModule {}
