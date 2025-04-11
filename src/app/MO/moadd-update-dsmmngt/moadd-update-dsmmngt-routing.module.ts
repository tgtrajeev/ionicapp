import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MOAddUpdateDSMMngtPage } from './moadd-update-dsmmngt.page';

const routes: Routes = [
  {
    path: '',
    component: MOAddUpdateDSMMngtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MOAddUpdateDSMMngtPageRoutingModule {}
