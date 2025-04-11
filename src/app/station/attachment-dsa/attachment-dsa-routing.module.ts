import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmentDsaPage } from './attachment-dsa.page';

const routes: Routes = [
  {
    path: '',
    component: AttachmentDsaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachmentDsaPageRoutingModule {}
