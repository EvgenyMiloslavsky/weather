import {Component, OnInit} from '@angular/core';
import {FavoriteService} from './favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: string[];

  constructor(private favoriteService: FavoriteService) {
  }

  ngOnInit() {
  this.favorites = this.favoriteService.getFavorites();
  console.log(this.favorites);

  }
}


/*
  @ViewChild('favoriteItem', {static: false, read: ViewContainerRef}) container;

    componentRef: ComponentRef;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
      this.container.clear();
      const factory: ComponentFactory = this.resolver.resolveComponentFactory(FavoriteItemComponent);

      this.componentRef = this.container.createComponent(factory);

      this.componentRef.instance.weatherIcon = type;

      this.componentRef.instance.output.subscribe(event => console.log(event));

    }
   */
