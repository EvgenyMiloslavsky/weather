import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  temperatura: string;
  day: string;

  constructor() {
  }

  ngOnInit() {
  }

}
