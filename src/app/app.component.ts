
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Choferes',
      url: '/choferes',
      icon: 'car'
    },
    {
      title: 'Clientes',
      url: '/clientes',
      icon: 'paw'
    },
    {
      title: 'Viajes',
      url: '/viajes',
      icon: 'trending-up'
    },
    {
      title: 'Configuracion',
      url: '/configuracion',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebase);
  }
}
