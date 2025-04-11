import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StationAttachmentPageRoutingModule } from './station-attachment-routing.module';

import { StationAttachmentPage } from './station-attachment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StationAttachmentPageRoutingModule
  ],
  declarations: [StationAttachmentPage]
})
export class StationAttachmentPageModule {}
