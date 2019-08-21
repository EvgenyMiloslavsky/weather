import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {WeatherModel} from '../weather.model';
import {FavoriteService} from '../../favorites/favorite.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(
    private weather: WeatherService,
    private favoriteService: FavoriteService) {
  }

  currentWeather: WeatherModel;
  favoriteStatus = false;

  currentLocation = environment.defaultCurrentLocation;


  ngOnInit() {
    this.weather.getCurrentCondition(this.currentLocation);
    this.subscription = this.weather.getTemUpdateListener()
      .subscribe(
        currentCondition => {
          this.currentWeather = currentCondition;
          console.log(currentCondition);
          this.favoriteStatus = this.favoriteService.isFavorite(this.currentWeather.city);
          console.log('Init Weather' + this.currentWeather.city);
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToFavorites() {
    this.favoriteStatus = true;
    this.favoriteService.addToFavorites(this.currentWeather.city);
  }
}
