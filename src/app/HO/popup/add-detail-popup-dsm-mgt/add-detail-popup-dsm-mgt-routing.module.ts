import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetailPopupDsmMgtPage } from './add-detail-popup-dsm-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetailPopupDsmMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetailPopupDsmMgtPageRoutingModule {}
