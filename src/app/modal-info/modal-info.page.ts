import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { empty, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/usuario';
import { ImgService } from '../services/img/img.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() id;


  public archivo: File;
  public archivosServer: File;
  public lastPK: number;

  hola = false;
  img;

  imagen: File;

  prueba: ['ADMIN_ROLE', 'USER_ROLE']


  usuario = new UsuarioModel;
  uploadFiles: Array <File>;

  constructor(private modalCtrl: ModalController, private usu: UsuarioService, private imgservice: ImgService) { }

  ngOnInit() {
    console.log(this.id);
    if (this.id == undefined) {
      console.log(this.id)
      this.usuario._id = sessionStorage.getItem('user_id');
      this.usuario.email = sessionStorage.getItem('user_ema');
      this.usuario.nombre = sessionStorage.getItem('user_nom');
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
          usuario.password = '';
          this.usuario = usuario
          this.img = 'http://localhost:3000/img/usuarios/' + usuario.img;

        })
      }

    }

    this.img = 'http://localhost:3000/img/usuarios/' + this.usuario.img;
    console.log(this.img)
    console.log(this.usuario)

    
  }

  onUpload(){
    let formData = new FormData();  


    console.log(formData)
    for (let file of this.uploadFiles) {
      
      formData.append("imagen", file);
      console.log(formData)
    }
    
    //call service

    this.imgservice.UPloadFile(formData, 'usuarios', this.usuario._id).subscribe(resp => {
      console.log(resp)
    })

  }

  onFileChange(e){
    this.uploadFiles = e.target.files;
    console.log(this.uploadFiles)
  }


  getImg(){
    this.imgservice.getImagen('usuarios', this.usuario.img).subscribe(resp => {
      console.log(resp)
    })
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
         if (this.uploadFiles == null) {
        console.log('hola1')
      }else{
        console.log('hola324324324');
        this.onUpload()
      }
        
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