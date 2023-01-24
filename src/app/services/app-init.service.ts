import { Injectable } from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  public settings: any;

  constructor(private firebaseService: FirebaseService) { }

  public getSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.firebaseService.get_Settings().subscribe(data => {
        this.settings = data.map(e => {
          return {
            flashlight: e.payload.doc.data()['flashlight'],
            geolocation: e.payload.doc.data()['geolocationDisplay'],
            id: e.payload.doc.id,
          };
        })
        console.log("got settings from app-init-service")
      }));
    })
  }
}
