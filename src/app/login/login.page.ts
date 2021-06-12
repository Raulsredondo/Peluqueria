import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { first } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js'; 



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public username: string;
  public password: string;



  public error: string;
  encrypted;




  constructor(private alertCtrl: AlertController, private auth: LoginService, private router: Router) { }


  ngOnInit() {
    


  }


  public submit() {
    this.encrypted = CryptoJS.AES.encrypt(this.password, this.username);
    console.log(this.encrypted)
    this.auth.login(this.username, this.encrypted.toString())
      .pipe(first())
      .subscribe(
        result => {
          if (result == true) {
            this.router.navigate(['tabs/tabs/tab1'])
          }

        },
        err => {
        this.error = 'Email o Password incorrectos'
          this.handleButtonClick()

        }

      );
  }
  logout() {
    this.auth.logout();
  }

  async handleButtonClick() {
    const alert = await this.alertCtrl.create({
      header: 'Email o Password',
      message: 'El Email o Password son incorrectos',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
