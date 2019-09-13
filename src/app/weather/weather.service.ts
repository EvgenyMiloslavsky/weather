import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {map, switchMap} from 'rxjs/operators';
import {WeatherModel} from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  currentLocation = environment.defaultCurrentLocation; // 215854
  API_KEY = environment.appKey;
  BASIC_URL = environment.apiUrl;
  locationKey = environment.defaultCurrentLocation;
  currentTemperature: string;
  currentLocationUpdated = new Subject<WeatherModel>();

  constructor(private http: HttpClient) {
  }

  /*getLocationKey(city: string) {
    this.http
      .get(
        `${this.BASIC_URL}/locations/v1/cities/search?apikey=${this.API_KEY}&q=${city}&language=en-us&details=false`
      )
      .subscribe(
        res => {
          this.locationKey = res[0]['Key'];
          console.log(`Current location key is: ${this.locationKey}`);
        }
      );
  }*/

  getCurrentCondition(city: string) {
    this.http
      .get(
        `/locations/v1/cities/search?apikey=&q=${city}&language=en-us&details=false`
        // `assets/JSON/city-search.json`
      ).pipe(/* constructor(public loaderService: LoaderService) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   /*this.loaderService.show();

     return next.handle(req).pipe(
       // delay(5000),
       finalize(() => this.loaderService.hide())
     );
   }*/
      map(res => {
        this.locationKey = res[0].Key;
        console.log(`Location Key ${this.locationKey}`);
        return this.locationKey;
      }),
      switchMap((value: string) =>
        this.http
          .get<any>(
            // `assets/JSON/current-condition.json`
            `/currentconditions/v1/${value}?apikey=&language=en-us&details=true`
          ))
    )
      .subscribe(
        (responseCondition) => {
          console.log('Responce Cond: ', responseCondition);
          // this.currentTemperature = responseData[0].Temperature.Metric.Value;
          const currentCondition: WeatherModel = {
            city: city,
            weatherIcon: responseCondition[0].WeatherIcon,
            temperature: responseCondition[0].Temperature.Metric.Value,
            weatherText: responseCondition[0].WeatherText,
            favoriteStatus: false
        }
          ;
          this.currentLocationUpdated.next(currentCondition);
        },
        error => {
          console.error(error);
        }
      );
  }

  getTemUpdateListener() {
    return this.currentLocationUpdated.asObservable();
  }

  autocompleteSearch(value: string) {
    return this.http
      .get(`/locations/v1/cities/autocomplete?apikey=&q=${value}&language=en-us`);
    // .get('assets/JSON/autocomplete.json');
  }

  setCity(city: string) {
    console.log(`Set city ${city}`);
    this.currentLocation = city;
    this.getCurrentCondition(city);
  }
}
