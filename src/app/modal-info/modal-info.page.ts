import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/usuario';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() id;

  hola = false;

  prueba: ['ADMIN_ROLE', 'USER_ROLE']


  usuario = new UsuarioModel;

  constructor(private modalCtrl: ModalController, private usu: UsuarioService) { }

  ngOnInit() {
    console.log(this.id);
    if (this.id == undefined) {
      console.log(this.id)
      this.usuario._id = sessionStorage.getItem('user_id');
      this.usuario.email = sessionStorage.getItem('user_ema');
      this.usuario.nombre = sessionStorage.getItem('user_nom');
      this.usuario.password = sessionStorage.getItem('user_pass');
      this.usuario.img = sessionStorage.getItem('user_img');
      this.usuario.role = sessionStorage.getItem('role')
    } else {

      if (this.id == 'nuevo') {
        this.hola = true
        console.log(this.id)
      } else {
        console.log(this.id)
        this.usu.getUsuario(this.id).subscribe((usuario: UsuarioModel) => {
          console.log(usuario)
          this.usuario = usuario

        })
      }

    }

    this.usuario.password = '';
    console.log(this.usuario)


  }

  submit(form: NgForm) {

    if (form.invalid) {
      Swal.fire({
        title: 'Opssss',
        text: 'Formulario no valido',
        allowOutsideClick: false
      });
      return;
    }

    if (this.usuario.password == '') {
      console.log('hola')
      Swal.fire({
        title: 'Añade una Contaseña',
      });
    } else {
      let peticion: Observable<any>;

      if (this.hola) {
        peticion = this.usu.postUsuarios(this.usuario)
      } else {
        peticion = this.usu.putUsuarios(this.usuario)
      }

      peticion.subscribe(resp => {

        Swal.fire({
          title: this.usuario.nombre,
          text: 'Se actualizó correctamente',

        });

      },
        err => {
          console.log('HTTP Error', err.error.errors.errors.email.message)
          Swal.fire({
            title: this.usuario.nombre,
            text: err.error.errors.errors.email.message,
          });
        });
    }
    console.log(this.usuario)



  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
