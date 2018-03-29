import { HttpClient } from '@angular/common/http';
import { Feeds } from './../../model/feedsModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class ThinkspeakProvider {

  apiUrl = 'https://thingspeak.com/channels/459682/';
  
    constructor(public http: HttpClient) {
      console.log('Hello ThinkSpeakapiProvider Provider');
    }
  
    getFeeds() {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'/feed?results=10').subscribe(data => {
          //console.log(data);
          let response = data;
          resolve(response);
        }, err => {
          console.log(err);
        });
      });
  }

    getNewFeeds() {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'/feed?results=1').subscribe(data => {
          //console.log(data);
          let response = data;
          resolve(response);
        }, err => {
          console.log(err);
        });
      });
  }
}
