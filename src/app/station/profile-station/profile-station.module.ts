import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileStationPageRoutingModule } from './profile-station-routing.module';

import { ProfileStationPage } from './profile-station.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileStationPageRoutingModule
  ],
  declarations: [ProfileStationPage]
})
export class ProfileStationPageModule {}
