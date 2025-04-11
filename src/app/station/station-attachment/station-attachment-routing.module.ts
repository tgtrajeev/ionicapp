import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationAttachmentPage } from './station-attachment.page';

const routes: Routes = [
  {
    path: '',
    component: StationAttachmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationAttachmentPageRoutingModule {}
