import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatonStatusPageRoutingModule } from './staton-status-routing.module';

import { StatonStatusPage } from './staton-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatonStatusPageRoutingModule
  ],
  declarations: [StatonStatusPage]
})
export class StatonStatusPageModule {}
