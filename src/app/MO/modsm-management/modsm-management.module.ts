import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MODsmManagementPageRoutingModule } from './modsm-management-routing.module';

import { MODsmManagementPage } from './modsm-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MODsmManagementPageRoutingModule
  ],
  declarations: [MODsmManagementPage]
})
export class MODsmManagementPageModule {}
