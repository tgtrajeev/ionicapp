import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlOfficePage } from './control-office.page';

const routes: Routes = [
  {
    path: '',
    component: ControlOfficePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlOfficePageRoutingModule {}
