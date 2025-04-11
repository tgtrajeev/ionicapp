import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JMRPageRoutingModule } from './jmr-routing.module';

import { JMRPage } from './jmr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JMRPageRoutingModule
  ],
  declarations: [JMRPage]
})
export class JMRPageModule {}
