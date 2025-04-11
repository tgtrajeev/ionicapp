import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddApdatePackagePage } from './add-apdate-package.page';

const routes: Routes = [
  {
    path: '',
    component: AddApdatePackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddApdatePackagePageRoutingModule {}
