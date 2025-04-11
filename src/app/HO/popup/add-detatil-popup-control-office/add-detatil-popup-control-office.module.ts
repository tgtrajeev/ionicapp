import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetatilPopupControlOfficePageRoutingModule } from './add-detatil-popup-control-office-routing.module';

import { AddDetatilPopupControlOfficePage } from './add-detatil-popup-control-office.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetatilPopupControlOfficePageRoutingModule
  ],
  declarations: [AddDetatilPopupControlOfficePage]
})
export class AddDetatilPopupControlOfficePageModule {}
