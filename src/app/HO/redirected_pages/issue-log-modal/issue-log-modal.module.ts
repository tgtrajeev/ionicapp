import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueLogModalPageRoutingModule } from './issue-log-modal-routing.module';

import { IssueLogModalPage } from './issue-log-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueLogModalPageRoutingModule
  ],
  declarations: [IssueLogModalPage]
})
export class IssueLogModalPageModule {}
