import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicFormComponent } from './form/basic-form/basic-form.component';
import { ProTableListComponent } from './list/table-list/table-list.component';
import { ProProfileBaseComponent } from './profile/basic/basic.component';

const routes: Routes = [
  {
    path: 'form',
    children: [
      { path: 'basic-form', component: BasicFormComponent }
    ],
  },
  {
    path: 'list',
    children: [
      { path: 'table-list', component: ProTableListComponent },
    ],
  },
  {
    path: 'profile',
    children: [
      { path: 'basic', component: ProProfileBaseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProRoutingModule {}
