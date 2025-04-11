import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateRateMgtPageRoutingModule } from './add-update-rate-mgt-routing.module';

import { AddUpdateRateMgtPage } from './add-update-rate-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateRateMgtPageRoutingModule
  ],
  declarations: [AddUpdateRateMgtPage]
})
export class AddUpdateRateMgtPageModule {}
