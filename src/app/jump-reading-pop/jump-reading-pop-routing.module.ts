import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JumpReadingPopPage } from './jump-reading-pop.page';

const routes: Routes = [
  {
    path: '',
    component: JumpReadingPopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JumpReadingPopPageRoutingModule {}
