import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public fireStore: AngularFirestore) {
  }

  create_Settings(settings) {
    return this.fireStore.collection('Settings').add(settings);
  }

  get_Settings() {
    return this.fireStore.collection('Settings').snapshotChanges();
  }

  update_Settings(id, settings) {
    this.fireStore.doc('Settings/' + id).update(settings);
  }
}
