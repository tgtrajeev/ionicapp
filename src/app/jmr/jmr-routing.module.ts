import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JMRPage } from './jmr.page';

const routes: Routes = [
  {
    path: '',
    component: JMRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JMRPageRoutingModule {}
