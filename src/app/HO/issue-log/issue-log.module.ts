import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueLogPageRoutingModule } from './issue-log-routing.module';

import { IssueLogPage } from './issue-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueLogPageRoutingModule
  ],
  declarations: [IssueLogPage]
})
export class IssueLogPageModule {}
