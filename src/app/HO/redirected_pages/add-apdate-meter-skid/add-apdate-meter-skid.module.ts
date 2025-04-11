import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddApdateMeterSkidPageRoutingModule } from './add-apdate-meter-skid-routing.module';

import { AddApdateMeterSkidPage } from './add-apdate-meter-skid.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddApdateMeterSkidPageRoutingModule
  ],
  declarations: [AddApdateMeterSkidPage]
})
export class AddApdateMeterSkidPageModule {}
