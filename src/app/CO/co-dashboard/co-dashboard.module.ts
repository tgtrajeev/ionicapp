import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoDashboardPageRoutingModule } from './co-dashboard-routing.module';

import { CoDashboardPage } from './co-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoDashboardPageRoutingModule
  ],
  declarations: [CoDashboardPage]
})
export class CoDashboardPageModule {}
