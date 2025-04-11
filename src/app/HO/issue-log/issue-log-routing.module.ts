import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueLogPage } from './issue-log.page';

const routes: Routes = [
  {
    path: '',
    component: IssueLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueLogPageRoutingModule {}
