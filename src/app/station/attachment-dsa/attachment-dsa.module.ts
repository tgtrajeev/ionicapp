import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachmentDsaPageRoutingModule } from './attachment-dsa-routing.module';

import { AttachmentDsaPage } from './attachment-dsa.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AttachmentDsaPageRoutingModule
  ],
  declarations: [AttachmentDsaPage]
})
export class AttachmentDsaPageModule {}
