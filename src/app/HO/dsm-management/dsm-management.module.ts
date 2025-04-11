import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsmManagementPageRoutingModule } from './dsm-management-routing.module';

import { DsmManagementPage } from './dsm-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DsmManagementPageRoutingModule
  ],
  declarations: [DsmManagementPage]
})
export class DsmManagementPageModule {}
