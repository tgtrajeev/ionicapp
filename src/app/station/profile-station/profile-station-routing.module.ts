import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileStationPage } from './profile-station.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileStationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileStationPageRoutingModule {}
