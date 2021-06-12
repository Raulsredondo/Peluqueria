import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalpdfPageRoutingModule } from './modalpdf-routing.module';

import { ModalpdfPage } from './modalpdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalpdfPageRoutingModule
  ],
  declarations: [ModalpdfPage]
})
export class ModalpdfPageModule {}
