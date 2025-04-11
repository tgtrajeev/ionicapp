import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenralEntryPageRoutingModule } from './genral-entry-routing.module';

import { GenralEntryPage } from './genral-entry.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    GenralEntryPageRoutingModule
  ],
  declarations: [GenralEntryPage]
})
export class GenralEntryPageModule {}
