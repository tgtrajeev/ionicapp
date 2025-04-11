import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemarkPopupPageRoutingModule } from './remark-popup-routing.module';

import { RemarkPopupPage } from './remark-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemarkPopupPageRoutingModule
  ],
  declarations: [RemarkPopupPage]
})
export class RemarkPopupPageModule {}
