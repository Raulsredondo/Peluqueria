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


import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GooglePlus } from '@ionic-native/google-plus/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SocialLoginModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GooglePlus,
    LoginService, 
    RegistrationService,
    AuthGuard, 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
