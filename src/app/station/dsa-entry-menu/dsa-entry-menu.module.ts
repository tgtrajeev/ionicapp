import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DsaEntryMenuPageRoutingModule } from './dsa-entry-menu-routing.module';

import { DsaEntryMenuPage } from './dsa-entry-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DsaEntryMenuPageRoutingModule
  ],
  declarations: [DsaEntryMenuPage]
})
export class DsaEntryMenuPageModule {}
