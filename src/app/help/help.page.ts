import {Component, OnInit} from '@angular/core';
import {AppVersion} from '@awesome-cordova-plugins/app-version/ngx';
import {BuildInfo} from '@awesome-cordova-plugins/build-info/ngx';
import packageInfo from '../../../package.json';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  public versionNumber: string;
  public packageName: string;
  public developerName: string;
  public developerId: string;
  public appName: string;
  public buildDate: Date;
  public installDate: Date;

  constructor(private appVersion: AppVersion, buildInfo: BuildInfo) {

    this.appVersion.getVersionNumber().then(value => {
      this.versionNumber = value;
    }).catch(err => {
      alert(err);
    });
    this.packageName = buildInfo.packageName;
    this.buildDate = buildInfo.buildDate;
    this.installDate = buildInfo.installDate;
    this.developerName = packageInfo.author;
    this.developerId = packageInfo.id;
    this.appName = packageInfo.name;
  }

  ngOnInit() {}


}
