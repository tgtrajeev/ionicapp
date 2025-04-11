import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeResetLcvPageRoutingModule } from './change-reset-lcv-routing.module';

import { ChangeResetLcvPage } from './change-reset-lcv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeResetLcvPageRoutingModule
  ],
  declarations: [ChangeResetLcvPage]
})
export class ChangeResetLcvPageModule {}
