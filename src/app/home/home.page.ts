import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Flashlight} from '@awesome-cordova-plugins/flashlight/ngx';
import {Geolocation} from '@awesome-cordova-plugins/geolocation/ngx';


import * as Leaflet from 'leaflet';
import {AppInitService} from "../services/app-init.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  flashlightSetting: boolean;
  geolocationSetting: boolean;
  settings: any;
  locationSubscription: any;
  marker: any;

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  map: Leaflet;
  center: any = {
    lat: 48.21290703548005,
    lng: 16.36701368582914,
  };
  location: any = {
    lat: '',
    lng: '',
  }

  constructor(private flashlight: Flashlight, private geolocation: Geolocation, private appInitService: AppInitService) {
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.settings = this.appInitService.settings;
      this.flashlightSetting = this.settings[0].flashlight;
      this.geolocationSetting = this.settings[0].geolocation;
  };

  switchOn() {
    if (this.flashlight.isSwitchedOn()) {
      this.flashlight.switchOff();
    } else {
      this.flashlight.switchOn();
    }
  }

  ionViewDidEnter() {
    this.getCurrentLocation();
    this.createLeafletMap();
    this.watchPosition();
  }

  private createLeafletMap() {
    this.map = Leaflet.map('map').setView(this.center, 13);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© Angular LeafLet',
    }).addTo(this.map);
  };

  private setCurrentLocation() {
    const Icon = Leaflet.icon({
      iconUrl: 'assets/icon/favicon.png',
      iconSize: [20, 20],
    })
    this.marker = Leaflet.marker(this.location, {icon: Icon}).addTo(this.map).bindPopup('My Location').openPopup();
  }

  private getCurrentLocation() {
    this.geolocation.getCurrentPosition({enableHighAccuracy : true}).then((resp) => {
      this.location = new Leaflet.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log(this.location);
      this.setCurrentLocation();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  watchPosition() {
    this.locationSubscription = this.geolocation.watchPosition({ enableHighAccuracy : true, timeout: 10000 });
    this.locationSubscription.subscribe((resp) => {
      this.location = new Leaflet.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log('updatet')
      console.log(this.location);
      this.marker.setLatLng(this.location);
    });
  }
}


