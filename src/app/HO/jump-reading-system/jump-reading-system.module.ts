import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JumpReadingSystemPageRoutingModule } from './jump-reading-system-routing.module';

import { JumpReadingSystemPage } from './jump-reading-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JumpReadingSystemPageRoutingModule
  ],
  declarations: [JumpReadingSystemPage]
})
export class JumpReadingSystemPageModule {}
