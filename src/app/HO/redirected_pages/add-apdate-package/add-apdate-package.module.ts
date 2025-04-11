import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddApdatePackagePageRoutingModule } from './add-apdate-package-routing.module';

import { AddApdatePackagePage } from './add-apdate-package.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddApdatePackagePageRoutingModule
  ],
  declarations: [AddApdatePackagePage]
})
export class AddApdatePackagePageModule {}
