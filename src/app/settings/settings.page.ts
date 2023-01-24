import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {AppInitService} from "../services/app-init.service";
import {LocalNotifications} from "@awesome-cordova-plugins/local-notifications/ngx";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  flashlight: boolean;
  geolocationDisplay: boolean;
  settings: any;

  constructor(private firebaseService: FirebaseService, private appInitService: AppInitService,
              private localNotifications: LocalNotifications) {
  }

  ngOnInit() {
    this.setSettings();
  }

  setSettings() {
    this.settings = this.appInitService.settings
    if (this.settings.length === 0) {
      this.createSettings();
    } else {
      this.geolocationDisplay = this.settings[0].geolocation;
      this.flashlight = this.settings[0].flashlight;
    }
  }

  createSettings() {
    let settings = {};
    settings['geolocationDisplay'] = false;
    settings['flashlight'] = false
    this.firebaseService.create_Settings(settings).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
    this.getSettings();
  }

  getSettings() {
    this.firebaseService.get_Settings().subscribe(data => {
      this.settings = data.map(e => {
        return {
          flashlight: e.payload.doc.data()['flashlight'],
          geolocation: e.payload.doc.data()['geolocationDisplay'],
          id: e.payload.doc.id,
        };
      })
      this.setSettings();
    })
  }

  updateSettings() {
    let settings = {};
    settings['geolocationDisplay'] = this.geolocationDisplay;
    settings['flashlight'] = this.flashlight;
    this.firebaseService.update_Settings(this.settings[0].id, settings);
    this.settings = this.appInitService.settings;
    this.makeNotification();
  }

  makeNotification() {
    this.localNotifications.schedule({
      id: 1,
      text: 'settings saved',
    })
  }
}
