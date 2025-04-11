import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackagePageRoutingModule } from './package-routing.module';

import { PackagePage } from './package.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PackagePageRoutingModule
  ],
  declarations: [PackagePage]
})
export class PackagePageModule {}
