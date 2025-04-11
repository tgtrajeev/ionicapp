import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaSortingPageRoutingModule } from './dsa-sorting-routing.module';

import { DsaSortingPage } from './dsa-sorting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DsaSortingPageRoutingModule
  ],
  declarations: [DsaSortingPage]
})
export class DsaSortingPageModule {}
