import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeResetGesGensetPageRoutingModule } from './change-reset-ges-genset-routing.module';

import { ChangeResetGesGensetPage } from './change-reset-ges-genset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeResetGesGensetPageRoutingModule
  ],
  declarations: [ChangeResetGesGensetPage]
})
export class ChangeResetGesGensetPageModule {}
