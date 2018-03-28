import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TemperaturePage } from '../temperature/temperature';
import { PressurePage } from '../pressure/pressure';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TemperaturePage;
  tab3Root = PressurePage;

  constructor() {

  }
}
