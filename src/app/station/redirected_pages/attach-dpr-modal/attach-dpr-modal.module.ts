import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachDprModalPageRoutingModule } from './attach-dpr-modal-routing.module';

import { AttachDprModalPage } from './attach-dpr-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachDprModalPageRoutingModule
  ],
  declarations: [AttachDprModalPage]
})
export class AttachDprModalPageModule {}
