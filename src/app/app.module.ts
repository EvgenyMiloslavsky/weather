import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {WeatherDetailsComponent} from './weather/weather-details/weather-details.component';
import {WeatherComponent} from './weather/weather.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SearchLocationComponent} from './weather/search-location/search-location.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ForecastComponent} from './weather/forecast/forecast.component';
import {FavoriteItemComponent} from './favorites/favorite-item/favorite-item.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {CachingInterceptor} from './interceptors/caching.interceptor';
import {UrlInterceptor} from './interceptors/url.interceptor';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WeatherDetailsComponent,
    WeatherComponent,
    SearchLocationComponent,
    ForecastComponent,
    FavoriteItemComponent,
    FavoritesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
