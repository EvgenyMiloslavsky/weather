import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  temperature: any;

  constructor(private weather: WeatherService) {
  }

  ngOnInit() {
  }

}
