import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppVersion} from '@awesome-cordova-plugins/app-version/ngx';
import {BuildInfo} from "@awesome-cordova-plugins/build-info/ngx";
import {environment} from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireRemoteConfigModule, SETTINGS} from "@angular/fire/compat/remote-config";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {FirebaseService} from "./services/firebase.service";
import {Flashlight} from "@awesome-cordova-plugins/flashlight/ngx";
import {Geolocation} from "@awesome-cordova-plugins/geolocation/ngx";
import {LocalNotifications} from "@awesome-cordova-plugins/local-notifications/ngx";
import {AppInitService} from "./services/app-init.service";

export const initApp = (appInitService: AppInitService) => async () => {
  await appInitService.getSettings();
  return Promise.resolve();
}

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireRemoteConfigModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
    AppVersion,
    BuildInfo,
    FirebaseService,
    Flashlight,
    Geolocation,
    LocalNotifications,
    AppInitService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppInitService], multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    if (environment.production == true) {
      document.body.classList.toggle('dark')

    }
    console.log("Production mode enabled: " + environment.production)
  }
}
