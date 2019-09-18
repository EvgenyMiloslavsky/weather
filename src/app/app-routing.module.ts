import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WeatherComponent} from './weather/weather.component';
import {FavoritesComponent} from './favorites/favorites.component';

const routes: Routes = [
  {path: '', component: WeatherComponent},
  {path: 'favorites', loadChildren : './favorites/favorites.module#FavoritesModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
