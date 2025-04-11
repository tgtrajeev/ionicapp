import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddApdateDsmMgtPageRoutingModule } from './add-apdate-dsm-mgt-routing.module';

import { AddApdateDsmMgtPage } from './add-apdate-dsm-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddApdateDsmMgtPageRoutingModule
  ],
  declarations: [AddApdateDsmMgtPage]
})
export class AddApdateDsmMgtPageModule {}
