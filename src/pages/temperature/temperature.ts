import { ThinkspeakProvider } from './../../providers/thinkspeak/thinkspeak';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html',
})
export class TemperaturePage {

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
      this.getTemperatureChart();
    });
  }

  getTemperatureChart(){
    let user = this.users.feeds;
        for(let key in user){
        if(user.hasOwnProperty(key)){
          //console.log(user[key]);
          this.newTemperaturePoint([user[key]['field1']], user[key]['created_at']);
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
            this.newTemperaturePoint([feed[key]['field1']], feed[key]['created_at']);          
          }
      }
    }
  }
  
  temperatureChartOptions = {
    responsive: true
  };

  temperatureChartData = [
    { data: [], label: 'Temperature' }
  ];

  temperatureChartLabels = [];

  onChartClick(event) {
    console.log(event);
  }

  newTemperaturePoint(dataArr = [100], label) {
      this.temperatureChartData.forEach((dataset, index) => {
        this.temperatureChartData[index] = Object.assign({}, this.temperatureChartData[index], {
          data: [...this.temperatureChartData[index].data, dataArr[index]]
        });
      });
      this.temperatureChartLabels = [...this.temperatureChartLabels, label];
    }
    
}
