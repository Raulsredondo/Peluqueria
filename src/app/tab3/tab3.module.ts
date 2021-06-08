import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ModalInfoPageModule }  from '../modal-info/modal-info.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ModalInfoPage }  from '../modal-info/modal-info.page';
import { FilterPipe } from '../pipes/filter.pipe';
import { Filter2Pipe } from '../pipes/filter2.pipe';

@NgModule({
  entryComponents: [
    ModalInfoPage
  ],
  imports: [
    
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    ModalInfoPageModule,
  ],
  declarations: [Tab3Page, FilterPipe, Filter2Pipe]
})
export class Tab3PageModule {}
