import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateUserPage } from './add-update-user.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateUserPageRoutingModule {}
