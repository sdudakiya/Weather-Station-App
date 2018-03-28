import { ThinkspeakProvider } from './../../providers/thinkspeak/thinkspeak';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-pressure',
  templateUrl: 'pressure.html',
})
export class PressurePage {

  users: any;
  last_entry_id: any;
  
  constructor(public navCtrl: NavController, public _thinkSpeakApi: ThinkspeakProvider) {
    this.getFeeds();
    Observable.interval(20000).subscribe(x => {
        this.refreshData();
    });
  }

  getFeeds() {
    this._thinkSpeakApi.getFeeds()
    .then(data => {
      this.users = data;
      console.log(data);      
      //console.log(this.users);
      this.getPressureChart();
    });
  }

  getPressureChart(){
    let user = this.users.feeds;
        for(let key in user){
        if(user.hasOwnProperty(key)){
          //console.log(user[key]);
          this.newPressurePoint([user[key]['field2']], user[key]['created_at']);
        }
      }
  }

  refreshData() {
    this._thinkSpeakApi.getFeeds()
    .then(data => {
      this.users = data;
      this.last_entry_id = this.users.channel.last_entry_id;
      this.getLatestFeed(this.last_entry_id);
      //console.log(this.users);
    });
  }

  getLatestFeed(last_entry_id){
      let feed = this.users.feeds;
      for(let key in feed){
      if(feed.hasOwnProperty(key)){
          if(feed[key]['entry_id'] > this.last_entry_id){
            console.log('Key found')
            this.newPressurePoint([feed[key]['field2']], feed[key]['created_at']);          
          }
      }
    }
  }

  
  pressureChartOptions = {
    responsive: true
  };

  pressureChartData = [
    { data: [], label: 'Pressure' }
  ];

  pressureChartLabels = [];

  onChartClick(event) {
    console.log(event);
  }

  newPressurePoint(dataArr = [100], label) {
      this.pressureChartData.forEach((dataset, index) => {
        this.pressureChartData[index] = Object.assign({}, this.pressureChartData[index], {
          data: [...this.pressureChartData[index].data, dataArr[index]]
        });
      });
      this.pressureChartLabels = [...this.pressureChartLabels, label];
    }

}
