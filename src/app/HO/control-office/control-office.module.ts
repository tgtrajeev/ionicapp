import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlOfficePageRoutingModule } from './control-office-routing.module';

import { ControlOfficePage } from './control-office.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlOfficePageRoutingModule
  ],
  declarations: [ControlOfficePage]
})
export class ControlOfficePageModule {}
