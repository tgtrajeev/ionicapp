import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachmentDprPageRoutingModule } from './attachment-dpr-routing.module';

import { AttachmentDprPage } from './attachment-dpr.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AttachmentDprPageRoutingModule
  ],
  declarations: [AttachmentDprPage]
})
export class AttachmentDprPageModule {}
