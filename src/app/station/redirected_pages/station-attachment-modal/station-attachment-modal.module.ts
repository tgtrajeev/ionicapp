import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StationAttachmentModalPageRoutingModule } from './station-attachment-modal-routing.module';

import { StationAttachmentModalPage } from './station-attachment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StationAttachmentModalPageRoutingModule
  ],
  declarations: [StationAttachmentModalPage]
})
export class StationAttachmentModalPageModule {}
