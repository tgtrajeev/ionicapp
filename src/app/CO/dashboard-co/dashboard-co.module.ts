import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardCOPageRoutingModule } from './dashboard-co-routing.module';

import { DashboardCOPage } from './dashboard-co.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardCOPageRoutingModule
  ],
  declarations: [DashboardCOPage]
})
export class DashboardCOPageModule {}
