import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateMoManagmentPageRoutingModule } from './add-update-mo-managment-routing.module';

import { AddUpdateMoManagmentPage } from './add-update-mo-managment.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateMoManagmentPageRoutingModule
  ],
  declarations: [AddUpdateMoManagmentPage]
})
export class AddUpdateMoManagmentPageModule {}
