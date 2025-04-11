import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatonStatusPage } from './staton-status.page';

const routes: Routes = [
  {
    path: '',
    component: StatonStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatonStatusPageRoutingModule {}
