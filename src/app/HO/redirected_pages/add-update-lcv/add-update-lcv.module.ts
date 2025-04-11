import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateLcvPageRoutingModule } from './add-update-lcv-routing.module';

import { AddUpdateLcvPage } from './add-update-lcv.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateLcvPageRoutingModule
  ],
  declarations: [AddUpdateLcvPage]
})
export class AddUpdateLcvPageModule { }
