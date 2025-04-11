import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateManagementPageRoutingModule } from './rate-management-routing.module';

import { RateManagementPage } from './rate-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateManagementPageRoutingModule
  ],
  declarations: [RateManagementPage]
})
export class RateManagementPageModule {}
