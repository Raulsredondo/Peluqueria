import { CalendarComponent } from "ionic2-calendar/calendar";
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { PickerController } from "@ionic/angular";
import { EventModel } from '../models/evento';
import { Event2Model } from '../models/event2';
import { EventoService } from '../services/evento/evento.service'
import { Console } from "console";
import { NgForm } from "@angular/forms";
import { empty } from "rxjs";
import { LoginService } from "../services/login/login.service";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {




  medicoid;
  medicoemail;
  medicopass;

  collapseCard



  date = new Date();

  prueba = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000);

  minDate;
  service;

  event = new EventModel;
  event2 = new Event2Model;


  viewTitle;

  calendar = {
    mode: 'week' as CalendarMode,
    currentDate: new Date(),
  };



  eventSource = new Array();


  constructor(public EventService: EventoService, private auth: LoginService, public toastController: ToastController, private alertCtrl: AlertController, private pikerCtrl: PickerController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {


    this.EventService.getEventos().subscribe(eventos => {


      eventos.forEach((evento: Event2Model) => {

        evento.startTime = new Date(evento.startTime);
        evento.endTime = new Date(evento.endTime);
        this.eventSource.push(evento);
        console.log(evento)
        // evento.startTime = new Date.parse(evento.startTime);


      });
    });







    let hola = this.EventService.getEventos()
    console.log(hola)



    this.minDate = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();


    this.event.startTime = this.minDate

    this.resetEvent()





  }



  resetEvent() {
    this.event = {
      _id: '',
      usuid: '',
      usunombre: '',
      usuemail: '',
      id: '',
      title: '',
      desc: '',
      servicio: [
        {

          
          'servicio': 'corte de caballero 10€'
        },
        {
          
          'servicio': 'corte barba de caballero 5€'
        },
        {
          
          'servicio': 'corte de barba y cabello 15€'
        }
      ],
      serviociosele: '',
      startTime: '',
      endTime: '',
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

  logout() {
    this.auth.logout();
  };

  // Create the right event format and reload source
  addEvent() {
    let prueba;
    console.log(this.event.startTime.toString())
    if (this.event.serviociosele == '') {
      console.log('esta vacio')
      this.handleButtonClick3()
    }else{
      if (this.event.startTime.toString() == "") {
        console.log('esta vacio fecha')
        this.handleButtonClick4()
      } else {
        
      
    

    let eventCopy = {
      usuid: sessionStorage.getItem('user_id'),
      usuemail: sessionStorage.getItem('user_ema'),
      title: this.event.title,
      serviociosele: this.event.serviociosele,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    console.log(eventCopy);

    if (eventCopy.startTime.getTime() < this.date.getTime()) {

      this.handleButtonClick()
    } else {


      console.log(this.eventSource)
      if (this.eventSource.length > 0) {

        for (let char of this.eventSource) {
          console.log(char)
          // prints chars: H e l l o  W o r l d



          if (char.startTime.getFullYear() == eventCopy.startTime.getFullYear()) {
            console.log('año' + char.startTime.getFullYear(), eventCopy.startTime.getFullYear());
            prueba = false;
            if (char.startTime.getMonth() == eventCopy.startTime.getMonth()) {
              console.log('mes' + char.startTime.getMonth(), eventCopy.startTime.getMonth());
              prueba = false;
              if (char.startTime.getDay() == eventCopy.startTime.getDay()) {
                console.log('dia' + char.startTime.getDay(), eventCopy.startTime.getDay());
                prueba = false;
                if (char.startTime.getHours() == eventCopy.startTime.getHours()) {
                  console.log('hora' + char.startTime.getHours(), eventCopy.startTime.getHours());
                  prueba = false;
                  if (char.startTime.getMinutes() == eventCopy.startTime.getMinutes()) {
                    console.log('minuto' + char.startTime.getMinutes(), eventCopy.startTime.getMinutes());
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

          eventCopy.endTime = new Date(eventCopy.startTime.getTime() + 1800000);

          this.eventSource.push(eventCopy);

          this.toservice(eventCopy);

          this.resetEvent()
        }


      } else {

        console.log('es null el array de ventos')

        eventCopy.endTime = new Date(eventCopy.startTime.getTime() + 1800000);


        this.eventSource.push(eventCopy);

        this.toservice(eventCopy);


        this.resetEvent()







      }


    }
  }
  }
  }

  toservice(eventCopy) {

    console.log(eventCopy.startTime)





    
    this.EventService.postEvento(eventCopy).subscribe(res => {
      this.toastfunc()

    }
    )
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
      header: event.usuemail,
      subHeader: event.title + "   " + event.serviociosele,
      message: 'Fecha: ' + start,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked


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

  async handleButtonClick3() {
    const alert = await this.alertCtrl.create({
      header: 'Servicio no seleccionado',
      message: 'Seleciona un servicio para continuar',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async handleButtonClick4() {
    const alert = await this.alertCtrl.create({
      header: 'Fecha no selecionada',
      message: 'Seleciona una fecha para continuar',
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