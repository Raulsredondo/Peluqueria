import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ImgService {

  readonly URL_API = 'http://localhost:3000';
  readonly URL_API_IMG = 'http://localhost:3000/img';


  constructor(private _http: HttpClient) { }


  UPloadFile(formData, tipo: string, id: string ){
    const endpoint = this.URL_API + '/upload/' + tipo + '/' + id;
    return this._http.put(endpoint, formData);
  }

  getImagen(tipo, img) {
    return this._http.get(this.URL_API_IMG + '/'+tipo+'/'+img);
  }

}