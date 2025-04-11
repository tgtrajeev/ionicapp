import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoDashboardPageRoutingModule } from './mo-dashboard-routing.module';

import { MoDashboardPage } from './mo-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoDashboardPageRoutingModule
  ],
  declarations: [MoDashboardPage]
})
export class MoDashboardPageModule {}
