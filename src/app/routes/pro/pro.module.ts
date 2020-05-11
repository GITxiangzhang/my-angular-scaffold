import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { ProRoutingModule } from './pro-routing.module';
import { BasicFormComponent } from './form/basic-form/basic-form.component';
import { ProTableListComponent } from './list/table-list/table-list.component';
import { ProProfileBaseComponent } from './profile/basic/basic.component';


const COMPONENTS = [
  BasicFormComponent,
  ProTableListComponent,
  ProProfileBaseComponent,
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, ProRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ProModule {
}
