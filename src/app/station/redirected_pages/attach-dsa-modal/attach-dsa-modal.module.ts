import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachDsaModalPageRoutingModule } from './attach-dsa-modal-routing.module';

import { AttachDsaModalPage } from './attach-dsa-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachDsaModalPageRoutingModule
  ],
  declarations: [AttachDsaModalPage]
})
export class AttachDsaModalPageModule {}
