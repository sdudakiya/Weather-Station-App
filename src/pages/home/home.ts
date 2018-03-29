import { Feeds } from './../../model/feedsModel';
import { ThinkspeakProvider } from './../../providers/thinkspeak/thinkspeak';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;
  field1: string;
  last_entry_id: any;
  dbData: any;
  show = false;

  constructor(public navCtrl: NavController, public _thinkSpeakApi: ThinkspeakProvider) {
    this.getFeeds();
  }

  ionViewDidEnter(){
    Observable.interval(2000).subscribe(x => {
      this.getFeeds();
    }); 
  }
  getFeeds() {
    this._thinkSpeakApi.getFeeds()
    .then(data => {
      this.users = data;
      this.field1 = this.users.channel.field1;
      this.last_entry_id = this.users.channel.last_entry_id;
      this.getLatestFeed(this.last_entry_id);
      //console.log(this.dbData);
      //console.log(this.users);
    });
  }

  getLatestFeed(last_entry_id){
      let feed = this.users.feeds;
      for(let key in feed){
      if(feed.hasOwnProperty(key)){
          if(feed[key]['entry_id'] == this.last_entry_id){
            //console.log('Key found in home')
            this.dbData = feed[key];
            this.show = true;
          }
      }
    }
  }
}