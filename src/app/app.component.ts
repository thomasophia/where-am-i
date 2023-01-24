import { Component } from '@angular/core';
import {SplashScreen, SplashScreenPlugin} from "@capacitor/splash-screen";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
    { title: 'Help', url: '/help', icon: 'help' },

  ];
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(()=> {
      SplashScreen.hide();
    })
  }
}
