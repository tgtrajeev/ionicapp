import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddApdateDsmMgtPage } from './add-apdate-dsm-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddApdateDsmMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddApdateDsmMgtPageRoutingModule {}
