import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {
  searchCity = new FormControl();
  filteredData: string[];
  isLoading = false;
  errorMsg: string;
  tempValue: string;

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService
  ) {
  }

  ngOnInit() {
    this.searchCity.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredData = [];
        }),
        filter(Boolean),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((value: string) =>
          this.weatherService.autocompleteSearch(value)
            .pipe(
              tap(() => {
                this.tempValue = value;
              }),
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .pipe(
        map(
          (response: string[]) => {
            return response.map(item => item['LocalizedName']);
          }
        ),
      )
      .subscribe(data => {
        if (data === undefined) {
          this.errorMsg = data['Error'];
          this.filteredData = [];
        } else {
          this.errorMsg = '';
          // this.filteredData =  data;
          this.filteredData = this._filter(this.tempValue, data);
        }
      });
  }

  private _filter(value: string, data: string[]): string[] {
    const filterValue = value.toLowerCase();
    return data.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelectedCity() {
    if (this.filteredData.includes(this.searchCity.value)) {
      this.weatherService.setCity(this.searchCity.value);
    } else {
      console.log(`Wrong City name`);
    }
    this.searchCity.reset();
  }
}
