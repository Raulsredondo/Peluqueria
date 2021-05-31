import { CalendarComponent } from "ionic2-calendar/calendar";
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { PickerController } from "@ionic/angular";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  collapseCard



  date = new Date();

  prueba = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000);

  minDate;
  service;

  event = {
    title: '',
    desc: '',
    servicio: [{'precio': '10', 'servicio': 'corte de caballero'}, {'precio': '5', 'servicio': 'corte barba de caballero'}],
    serviociosele: '',
    startTime: '',
    endTime: '',
    allDay: false
  };


  viewTitle;

  calendar = {
    mode: 'week' as CalendarMode,
    currentDate: new Date(),
  };



  eventSource = [];


  constructor(private alertCtrl: AlertController, private pikerCtrl: PickerController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {

    this.minDate = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();


    this.event.startTime = this.minDate

    this.resetEvent()

    console.log(this.event)



  }



  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      servicio: [{'precio': '10', 'servicio': 'corte de caballero'}, {'precio': '5', 'servicio': 'corte barba de caballero'}],
      serviociosele: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    
    var inputValue = (<HTMLInputElement>document.getElementById('hola')).value;
    console.log(inputValue)
    let eventCopy = {
      title: this.event.title,
      serviociosele: inputValue,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
    console.log(eventCopy.startTime.getUTCHours)

    if (eventCopy.startTime.getTime() < this.prueba.getTime()) {
      console.log("funciona")
      this.handleButtonClick()
    } else {
      console.log(eventCopy.startTime)

      eventCopy.endTime = new Date(eventCopy.startTime.getTime() + 1800000);


      this.eventSource.push(eventCopy);
      console.log(this.eventSource)
      this.resetEvent()

    }
  }

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  async handleButtonClick() {
    const alert = await this.alertCtrl.create({
      header: 'Fecha incorrecta',
      message: 'Seleciona una fecha correcta',
      buttons: ['Ok']
    });

    await alert.present();
  }



  async openPicker(numColumns = 1, numOptions = 5, columnOptions = this.event.servicio){
    const picker = await this.pikerCtrl.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value ${value}`);
          }
        }
      ]
    });

    await picker.present();
  }

   getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

 getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }
}