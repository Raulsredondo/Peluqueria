import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalpdfPage } from './modalpdf.page';

const routes: Routes = [
  {
    path: '',
    component: ModalpdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalpdfPageRoutingModule {}
