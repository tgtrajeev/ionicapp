import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateUserPageRoutingModule } from './add-update-user-routing.module';

import { AddUpdateUserPage } from './add-update-user.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateUserPageRoutingModule
  ],
  declarations: [AddUpdateUserPage]
})
export class AddUpdateUserPageModule {}
