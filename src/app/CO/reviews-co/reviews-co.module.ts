import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsCOPageRoutingModule } from './reviews-co-routing.module';

import { ReviewsCOPage } from './reviews-co.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    ReviewsCOPageRoutingModule
  ],
  declarations: [ReviewsCOPage]
})
export class ReviewsCOPageModule {}
