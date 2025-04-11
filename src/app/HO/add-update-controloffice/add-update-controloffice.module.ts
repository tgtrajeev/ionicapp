import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateControlofficePageRoutingModule } from './add-update-controloffice-routing.module';

import { AddUpdateControlofficePage } from './add-update-controloffice.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateControlofficePageRoutingModule
  ],
  declarations: [AddUpdateControlofficePage]
})
export class AddUpdateControlofficePageModule {}
