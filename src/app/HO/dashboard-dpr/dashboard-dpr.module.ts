import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDprPageRoutingModule } from './dashboard-dpr-routing.module';

import { DashboardDprPage } from './dashboard-dpr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDprPageRoutingModule
  ],
  declarations: [DashboardDprPage]
})
export class DashboardDprPageModule {}
