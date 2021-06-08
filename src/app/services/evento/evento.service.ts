import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../../models/evento';
import { map, delay } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Key } from 'protractor';
import * as CryptoJS from 'crypto-js';
import { Event2Model } from '../../models/event2';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  readonly URL_API = 'http://localhost:3000/evento';
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  };

  prueba:string = sessionStorage.getItem('access_token');
  constructor(private http: HttpClient) { }


  postEvento(evento: EventModel) {
    console.log(evento)
    //evento.startTime = evento.startTime.toString();
    //evento.endTime = evento.endTime.toString();
    console.log(evento)


    return this.http.post(this.URL_API+'?token='+this.prueba, evento);
  }

  getEventos() {
    return this.http.get(this.URL_API+'?token='+this.prueba)
      .pipe(
        map(this.crearArreglo),
        delay(0)
      );
  }

  deleteEvento(_id: string) {
    _id.toString()
     return this.http.delete(this.URL_API +  `/${_id}`+'?token='+this.prueba);
  }

  getEventosId(id) {
    return this.http.get(this.URL_API + `/${id}`+'?token='+this.prueba)
      .pipe(
        map(this.crearArreglo),
        delay(0)
      );
  }


  private crearArreglo(hospitalesObj: object) {

    const eventos: Event2Model[] = [];
    var hola = Object.keys(hospitalesObj).forEach(Key => {

      const evento: Event2Model[] = hospitalesObj[Key];

      for (let event of evento) {
        // 1, "string", false
        
        eventos.push(event);
      }

    });

    return eventos;

  }

}