import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioModel } from '../models/usuario';
import { EventoService } from '../services/evento/evento.service';
import { UsuarioService } from '../services/usuario/usuario.service';

import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
import { EventModel } from '../models/evento';
import { Event2Model } from '../models/event2';

@Component({
  selector: 'app-modalpdf',
  templateUrl: './modalpdf.page.html',
  styleUrls: ['./modalpdf.page.scss'],
})
export class ModalpdfPage implements OnInit {

  @Input() id;
  usuarios: UsuarioModel[];
  eventos: Event2Model[];
  hola;

  constructor(private modalCtrl: ModalController, private eventService: EventoService, private usu: UsuarioService) { }

  ngOnInit() {

    if (this.id == 'usuario') {
      this.hola = true
      this.usu.getUsuarios().subscribe(resp =>{
      this.usuarios = resp
      })

    }
    if (this.id == 'eventos') {
      this.hola = false
      this.eventService.getEventos().subscribe(resp => {
        this.eventos = resp;
        
      })

    }
    
  }


  exportPdf(){
    
    const div = document.getElementById('pdf')
    const options = { background: 'white', height: 845, width: 595 }
    domtoimage.toPng(div, options).then((dataUrl) => {
        //Initialize JSPDF
        const doc = new jsPDF({
          format: 'a4',
          unit: 'mm',
          orientation: 'l'
      });
        //Add image Url to PDF
        doc.addImage(dataUrl, 'PNG', 0, 0, 150, 150, 'landscape')
        doc.save('pdfDocument.pdf')
    })
    
}


exportPdf2(){

  const div = document.getElementById('pdf2')
  const options = { background: 'white', height: 845, width: 595 }
  domtoimage.toPng(div, options).then((dataUrl) => {
      //Initialize JSPDF
      const doc = new jsPDF({
        format: 'a3',
        unit: 'mm',
        orientation: 'p'
    });
      //Add image Url to PDF
      doc.addImage(dataUrl, 'PNG', 0, 0, 200, 200)
      doc.save('pdfDocument.pdf')
  })
}

  salir() {
    this.modalCtrl.dismiss();
  }

}
