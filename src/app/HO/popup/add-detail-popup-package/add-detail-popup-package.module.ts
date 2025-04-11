import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetailPopupPackagePageRoutingModule } from './add-detail-popup-package-routing.module';

import { AddDetailPopupPackagePage } from './add-detail-popup-package.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetailPopupPackagePageRoutingModule
  ],
  declarations: [AddDetailPopupPackagePage]
})
export class AddDetailPopupPackagePageModule {}
