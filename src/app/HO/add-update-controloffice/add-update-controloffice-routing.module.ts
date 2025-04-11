import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateControlofficePage } from './add-update-controloffice.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateControlofficePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateControlofficePageRoutingModule {}
