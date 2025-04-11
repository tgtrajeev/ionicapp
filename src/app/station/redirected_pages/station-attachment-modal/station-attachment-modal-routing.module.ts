import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationAttachmentModalPage } from './station-attachment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StationAttachmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationAttachmentModalPageRoutingModule {}
