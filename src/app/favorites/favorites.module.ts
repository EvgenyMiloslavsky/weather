import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavoritesComponent} from './favorites.component';
import {FavoriteItemComponent} from './favorite-item/favorite-item.component';
import {SharedModule} from '../shared.module';

export const ROUTES: Routes = [
  {path: '', component: FavoritesComponent}
];

@NgModule({
  declarations: [
    FavoritesComponent,
    FavoriteItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class FavoritesModule {
}
