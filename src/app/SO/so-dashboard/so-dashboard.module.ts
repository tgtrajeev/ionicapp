import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoDashboardPageRoutingModule } from './so-dashboard-routing.module';

import { SoDashboardPage } from './so-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoDashboardPageRoutingModule
  ],
  declarations: [SoDashboardPage]
})
export class SoDashboardPageModule {}
