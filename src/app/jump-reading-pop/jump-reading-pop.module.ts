import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JumpReadingPopPageRoutingModule } from './jump-reading-pop-routing.module';

import { JumpReadingPopPage } from './jump-reading-pop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JumpReadingPopPageRoutingModule
  ],
  declarations: [JumpReadingPopPage]
})
export class JumpReadingPopPageModule {}
