import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateStationManagementPageRoutingModule } from './add-update-station-management-routing.module';

import { AddUpdateStationManagementPage } from './add-update-station-management.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpdateStationManagementPageRoutingModule
  ],
  declarations: [AddUpdateStationManagementPage]
})
export class AddUpdateStationManagementPageModule {}
