import { Component } from '@angular/core';
import { EventoService } from '../services/evento/evento.service';
import { Event2Model } from '../models/event2';
import { EventModel } from '../models/evento';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { LoginService } from '../services/login/login.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioModel } from '../models/usuario';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  nombre;
  email;
  img;
  rol = false;
  id;
  eventos;
  usuarios;
  collapseCard;
  collapseCard2;
  filterPost = '';
  filterPost2 = '';

  constructor(private modalCtrl: ModalController, private eventService: EventoService, private alertCtrl: AlertController, private auth: LoginService, private usu: UsuarioService) { }
  ngOnInit() {
    this.id = sessionStorage.getItem('user_id')
    this.nombre = sessionStorage.getItem('user_nom')
    this.email = sessionStorage.getItem('user_ema')
    this.img = sessionStorage.getItem('user_img')

    if (sessionStorage.getItem('role') === 'ADMIN_ROLE') {
      this.rol = true;
    }

    if (this.rol) {

      this.usu.getUsuarios().subscribe(usuarios => {
        this.usuarios = usuarios

      })



      this.eventService.getEventos().subscribe(eventos => {



        this.eventos = eventos
        
      });
    } else {
      this.eventService.getEventosId(this.id).subscribe(eventos => {



        this.eventos = eventos
        
      });
    }

  }




  logout() {
    this.auth.logout();
  };

  borrarEvento(evento: EventModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${evento.title}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.eventService.deleteEvento(evento._id).subscribe();
        this.eventos.splice(i, 1);

      }

    });



  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {

      }
    });
    await modal.present();
  }

  async abrirModal2(id) {
    console.log(id)
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        id: id
      }
    });
    await modal.present();
  }

  async add() {
    console.log()
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        id: 'nuevo'
      }
    });
    await modal.present();
  }




  async info(evento: Event2Model) {
    const alert = await this.alertCtrl.create({
      header: evento.usuemail,
      subHeader: evento.title + "   " + evento.serviociosele,
      message: 'Fecha: ' + evento.startTime,
      buttons: ['OK']
    });

    await alert.present();
  }

  async info2(usuario: UsuarioModel) {
    const alert = await this.alertCtrl.create({
      header: usuario.nombre,
      subHeader: usuario.email,
      message: usuario.role,
      buttons: ['OK']
    });

    await alert.present();
  }

}
