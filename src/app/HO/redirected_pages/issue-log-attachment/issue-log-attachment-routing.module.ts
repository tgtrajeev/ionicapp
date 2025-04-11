import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueLogAttachmentPage } from './issue-log-attachment.page';

const routes: Routes = [
  {
    path: '',
    component: IssueLogAttachmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueLogAttachmentPageRoutingModule {}
