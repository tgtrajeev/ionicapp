import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueLogModalPage } from './issue-log-modal.page';

const routes: Routes = [
  {
    path: '',
    component: IssueLogModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueLogModalPageRoutingModule {}
