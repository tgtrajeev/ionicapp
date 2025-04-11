import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsCOPage } from './reviews-co.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewsCOPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsCOPageRoutingModule {}
