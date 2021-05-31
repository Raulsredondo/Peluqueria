import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CalendarComponent } from "ionic2-calendar/calendar";
 
import { Tab1Page } from './tab1.page';
import { NgCalendarModule  } from 'ionic2-calendar';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1PageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
