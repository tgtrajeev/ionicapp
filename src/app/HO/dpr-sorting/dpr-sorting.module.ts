import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprSortingPageRoutingModule } from './dpr-sorting-routing.module';

import { DprSortingPage } from './dpr-sorting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DprSortingPageRoutingModule
  ],
  declarations: [DprSortingPage]
})
export class DprSortingPageModule {}
