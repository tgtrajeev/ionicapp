import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MOManagementPageRoutingModule } from './mo-management-routing.module';

import { MOManagementPage } from './mo-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MOManagementPageRoutingModule
  ],
  declarations: [MOManagementPage]
})
export class MOManagementPageModule {}
