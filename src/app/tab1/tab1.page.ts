import { CalendarComponent } from "ionic2-calendar/calendar";
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
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
    servicio: [
      {
        'precio': 10,
        'servicio': 'corte de caballero'
      },
      {
        'precio': 5,
        'servicio': 'corte barba de caballero'
      },
      {
        'precio': 15,
        'servicio': 'corte de barba y cabello'
      }
    ],
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



  eventSource = new Array();


  constructor(public toastController: ToastController, private alertCtrl: AlertController, private pikerCtrl: PickerController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {

    this.minDate = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();


    this.event.startTime = this.minDate

    this.resetEvent()





  }



  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      servicio: [
        {
          'precio': 10,
          'servicio': 'corte de caballero'
        },
        {
          'precio': 5,
          'servicio': 'corte barba de caballero'
        },
        {
          'precio': 15,
          'servicio': 'corte de barba y cabello'
        }
      ],
      serviociosele: '',
      startTime: '',
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  async toastfunc() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Cita Añadida',
    });

    await toast.present();
  }

  // Create the right event format and reload source
  addEvent() {
    let prueba;
    if (this.eventSource.length > 0) {
      console.log('es null el array de ventos')
    } else {
      console.log('no es nul')
    }
    var inputValue = (<HTMLInputElement>document.getElementById('hola')).value;

    let eventCopy = {
      title: this.event.title,
      serviociosele: inputValue,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.startTime.getTime() < this.date.getTime()) {
      console.log("funciona")
      this.handleButtonClick()
    } else {
      console.log(this.eventSource)


      if (this.eventSource.length > 0) {
        console.log('no es nul')
        for (let char of this.eventSource) {
          console.log('recorre el array')
          console.log(this.eventSource)
          console.log(char.startTime);
          console.log(eventCopy.startTime); // prints chars: H e l l o  W o r l d



          if (char.startTime.getFullYear() == eventCopy.startTime.getFullYear()) {
            console.log('año'+ char.startTime.getFullYear(), eventCopy.startTime.getFullYear());
            prueba = false;
            if (char.startTime.getMonth() == eventCopy.startTime.getMonth()) {
              console.log('mes'+ char.startTime.getMonth(), eventCopy.startTime.getMonth());
              prueba = false;
              if (char.startTime.getDay() == eventCopy.startTime.getDay()) {
                console.log('dia'+ char.startTime.getDay(), eventCopy.startTime.getDay());
                prueba = false;
                if (char.startTime.getHours() == eventCopy.startTime.getHours()) {
                  console.log('hora'+ char.startTime.getHours(), eventCopy.startTime.getHours());
                  prueba = false;
                  if (char.startTime.getMinutes() == eventCopy.startTime.getMinutes()) {
                    console.log('minuto'+ char.startTime.getMinutes(), eventCopy.startTime.getMinutes());
                    prueba = false;
                    this.handleButtonClick2()
                    break;
                    
                  } else {
                    prueba = true;

                  }
                } else {
                  prueba = true;


                }
              } else {
                prueba = true;


              }

            } else {
              prueba = true;


            }
          } else {
            prueba = true;


          }

        }

        if (prueba == true) {
          this.toastfunc()
          eventCopy.endTime = new Date(eventCopy.startTime.getTime() + 1800000);
          
          this.eventSource.push(eventCopy);

          this.resetEvent()
        }


      } else {

        console.log('es null el array de ventos')
        this.toastfunc()
        eventCopy.endTime = new Date(eventCopy.startTime.getTime() + 1800000);
        this.eventSource = [];
        this.eventSource.push(eventCopy);

        this.resetEvent()







      }


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

  async handleButtonClick2() {
    const alert = await this.alertCtrl.create({
      header: 'Fecha incorrecta',
      message: 'Hora ya selecionada por otra cita',
      buttons: ['Ok']
    });

    await alert.present();
  }



  async openPicker(numColumns = 1, numOptions = 5, columnOptions = this.event.servicio) {
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