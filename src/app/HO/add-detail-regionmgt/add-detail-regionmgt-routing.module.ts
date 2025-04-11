import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetailRegionmgtPage } from './add-detail-regionmgt.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetailRegionmgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetailRegionmgtPageRoutingModule {}
