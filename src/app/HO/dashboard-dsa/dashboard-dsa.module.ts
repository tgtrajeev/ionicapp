import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDsaPageRoutingModule } from './dashboard-dsa-routing.module';

import { DashboardDsaPage } from './dashboard-dsa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDsaPageRoutingModule
  ],
  declarations: [DashboardDsaPage]
})
export class DashboardDsaPageModule {}
