import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachDprModalPage } from './attach-dpr-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AttachDprModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachDprModalPageRoutingModule {}
