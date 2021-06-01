import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioModel }  from '../models/usuario';
import * as CryptoJS from 'crypto-js'; 
import { RegistrationService } from '../services/registration/registration.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
 
  pass;
  email;
  peticion: Observable<any>;
  constructor(public RegisService: RegistrationService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  submit(){

    this.usuario.role = "USER_ROLE";
    var desencriptado1 = CryptoJS.AES.encrypt(this.usuario.password, this.usuario.email);
    this.usuario.password = desencriptado1.toString();
    this.usuario.img = null;
    console.log(desencriptado1.toString())
    console.log(this.usuario)
    this.peticion = this.RegisService.postUsuarios(this.usuario);
    this.peticion.subscribe(res =>
      {
        this.toastfunc()
      
          if (res == true) {
          this.router.navigate(['login'])
        }
        

      }
      )
   

  }

  


  async toastfunc() {
    const toast = await this.toastController.create({
      color: 'dark',
      position: 'top',
      duration: 2000,
      message: 'Usuario Registrado',
    });

    await toast.present();
  }

}
