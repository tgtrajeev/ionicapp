import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemarkPopupPage } from './remark-popup.page';

const routes: Routes = [
  {
    path: '',
    component: RemarkPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemarkPopupPageRoutingModule {}
