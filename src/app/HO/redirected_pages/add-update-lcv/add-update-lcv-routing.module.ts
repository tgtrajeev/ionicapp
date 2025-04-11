import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateLcvPage } from './add-update-lcv.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateLcvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateLcvPageRoutingModule {}
