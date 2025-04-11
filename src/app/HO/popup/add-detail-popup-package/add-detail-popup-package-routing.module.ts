import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetailPopupPackagePage } from './add-detail-popup-package.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetailPopupPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetailPopupPackagePageRoutingModule {}
