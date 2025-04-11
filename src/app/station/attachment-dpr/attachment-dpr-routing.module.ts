import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmentDprPage } from './attachment-dpr.page';

const routes: Routes = [
  {
    path: '',
    component: AttachmentDprPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachmentDprPageRoutingModule {}
