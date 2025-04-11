import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueLogAttachmentPageRoutingModule } from './issue-log-attachment-routing.module';

import { IssueLogAttachmentPage } from './issue-log-attachment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueLogAttachmentPageRoutingModule
  ],
  declarations: [IssueLogAttachmentPage]
})
export class IssueLogAttachmentPageModule {}
