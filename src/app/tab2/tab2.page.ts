import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { ImgService } from '../services/img/img.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    lable = {
        color: 'blue',
        text: 'Marcador'
      }
    
      position = {
        lat: 37.380895,
        lng: -5.95731
      }
    

  constructor() {

  }

  ngOnInit() {
      

  }

}
