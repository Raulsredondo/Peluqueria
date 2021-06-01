import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Key } from 'protractor';
import * as CryptoJS from 'crypto-js'; 


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  usuario: UsuarioModel;
  readonly URL_API = 'http://localhost:3000/registro';
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  };
  

  constructor(private http: HttpClient) { }


  postUsuarios(usuarios: UsuarioModel) {

    
    return this.http.post(this.URL_API, usuarios);
  }



}
