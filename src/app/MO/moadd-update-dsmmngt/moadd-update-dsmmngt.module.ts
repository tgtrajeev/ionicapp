import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MOAddUpdateDSMMngtPageRoutingModule } from './moadd-update-dsmmngt-routing.module';

import { MOAddUpdateDSMMngtPage } from './moadd-update-dsmmngt.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MOAddUpdateDSMMngtPageRoutingModule
  ],
  declarations: [MOAddUpdateDSMMngtPage]
})
export class MOAddUpdateDSMMngtPageModule {}
