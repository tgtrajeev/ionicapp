import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardMoPageRoutingModule } from './dashboard-mo-routing.module';

import { DashboardMoPage } from './dashboard-mo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardMoPageRoutingModule
  ],
  declarations: [DashboardMoPage]
})
export class DashboardMoPageModule {}
