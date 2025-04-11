import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachDsaModalPage } from './attach-dsa-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AttachDsaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachDsaModalPageRoutingModule {}
