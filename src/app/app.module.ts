import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login/login.service';
import { RegistrationService } from './services/registration/registration.service'
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Auth/auth.guard';

import {GoogleMapsModule} from '@angular/google-maps'; 
import {MapMarker} from '@angular/google-maps'; 


import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SocialLoginModule, GoogleMapsModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GooglePlus,
    Geolocation,
    LoginService, 
    RegistrationService,
    AuthGuard, 
    GoogleMapsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
