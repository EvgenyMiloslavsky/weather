import {Injectable} from '@angular/core';
import {WeatherModel} from '../weather/weather.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: string[] = [];

  constructor() {

  }

  addToFavorites(favoriteCity: string): void {
    if (this.favorites.includes(favoriteCity)) {
      return;
    } else {
      this.favorites.push(favoriteCity);
    }
    console.log('Favorites', this.favorites);
  }

  getFavorites() {
    return [...this.favorites];
  }

  isFavorite(city: string): boolean {
    return this.favorites.includes(city);
  }
}
