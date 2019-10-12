import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

const fahrenheitToCelsius = require('fahrenheit-to-celsius');
import {SingletonService} from "../../service/singleton.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  enumDate = {1: 'Monday' , 2: 'Tuesday' , 3: 'Wednesday' ,4: 'Thursday' ,5: 'Friday' ,6: 'Saturday' , 0: 'Sunday' };

  // Control variables for input
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  keysAndCities = {};

  // Boolean to wait until api is back
  autoCompleteApiBack: boolean = false;

  // Var to save received data
  city: string = 'Tel Aviv';
  temperature: number = 0;
  day = [];
  weekTemperature = [];
  weekSunState = [];

  // Boolean to check if city in favorite
  isFavorite: boolean = false;

  // Boolean to raise error if input is wrong
  wrongCity: boolean = false;

  temp = {
    "Headline": {
      "EffectiveDate": "2019-10-11T14:00:00-06:00",
      "EffectiveEpochDate": 1570824000,
      "Severity": 4,
      "Text": "Thunderstorms in the area this afternoon through this evening",
      "Category": "thunderstorm",
      "EndDate": "2019-10-12T02:00:00-06:00",
      "EndEpochDate": 1570867200,
      "MobileLink": "http://m.accuweather.com/en/mx/tepic/234337/extended-weather-forecast/234337?lang=en-us",
      "Link": "http://www.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?lang=en-us"
    },
    "DailyForecasts": [
      {
        "Date": "2019-10-11T07:00:00-06:00",
        "EpochDate": 1570798800,
        "Temperature": {
          "Minimum": {
            "Value": 69,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 82,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 17,
          "IconPhrase": "Partly sunny w/ t-storms",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Night": {
          "Icon": 41,
          "IconPhrase": "Partly cloudy w/ t-storms",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Heavy"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=1&lang=en-us"
      },
      {
        "Date": "2019-10-12T07:00:00-06:00",
        "EpochDate": 1570885200,
        "Temperature": {
          "Minimum": {
            "Value": 69,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 83,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 17,
          "IconPhrase": "Partly sunny w/ t-storms",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Night": {
          "Icon": 41,
          "IconPhrase": "Partly cloudy w/ t-storms",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=2&lang=en-us"
      },
      {
        "Date": "2019-10-13T07:00:00-06:00",
        "EpochDate": 1570971600,
        "Temperature": {
          "Minimum": {
            "Value": 69,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 17,
          "IconPhrase": "Partly sunny w/ t-storms",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Night": {
          "Icon": 7,
          "IconPhrase": "Cloudy",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=3&lang=en-us"
      },
      {
        "Date": "2019-10-14T07:00:00-06:00",
        "EpochDate": 1571058000,
        "Temperature": {
          "Minimum": {
            "Value": 69,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 4,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 38,
          "IconPhrase": "Mostly cloudy",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=4&lang=en-us"
      },
      {
        "Date": "2019-10-15T07:00:00-06:00",
        "EpochDate": 1571144400,
        "Temperature": {
          "Minimum": {
            "Value": 68,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 4,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 8,
          "IconPhrase": "Dreary",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/mx/tepic/234337/daily-weather-forecast/234337?day=5&lang=en-us"
      }
    ]
  }

  constructor(private weather: WeatherService
  ,private singleton: SingletonService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges;
    if(this.singleton.city){
      this.myControl.setValue(this.singleton.city);
      this.getFiveDaysOfDailyForecasts();
    }
    else{
      if(this.singleton.day.length > 0){
        this.temperature = this.singleton.weekTemperature[0];
        this.day = this.singleton.day;
        this.weekTemperature = this.singleton.weekTemperature;
        this.singleton.favorites.filter(obj => {
          if(obj.city === this.city){
            this.isFavorite = true;
          }
        });
      }
      else{
        this.getFiveDaysOfDailyForecasts();
      }
    }
  }

  // Get autocomplete for all available cities in api
  getAutoComplete(){
    if(this.myControl.value !== '' && this.myControl.value !== ' '){
      this.weather.getAutoCompleteSearch(this.myControl.value).subscribe((cities : any) => {
        this.options = [];
        cities.forEach((city) => {
          this.options.push(city.LocalizedName);
          this.keysAndCities[city.LocalizedName] = city.Key;
        })
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        this.autoCompleteApiBack = true;
        }
      )
    }
  }

  // Get current condition for tel aviv
  getCurrentConditions(){
    this.weather.getCurrentConditions().subscribe((res) => {
      console.log(res)
    })
  }

  // Get 5 days of weather given city
  getFiveDaysOfDailyForecasts(){
    this.wrongCity = false;
    let key;
    let i = 0;
    if(this.myControl.value){
      key = this.keysAndCities[this.myControl.value];
    }
    else{
      key = '234337'; // Tel aviv key
    }
    this.singleton.favorites.filter(obj => {
      if(obj.city === this.city){
        this.isFavorite = true;
      }
    });
    //Temp
    this.singleton.favorites.filter(obj => {
      if(obj.city === this.city){
        this.isFavorite = true;
      }
    });
    // Set variables to show on screen
    this.temp.DailyForecasts.forEach((day) => {
      this.day[i] = this.utcDayToWeekDay(day.EpochDate);
      this.weekTemperature[i] = parseInt(fahrenheitToCelsius(day.Temperature.Maximum.Value) , 0);
      this.weekSunState[i] = day.Day.PrecipitationType;
      ++i;
    })
    if(this.myControl.value){
      this.isFavorite = false;
      this.city = this.myControl.value;
    }
    // Set today and singleton
    this.temperature = this.weekTemperature[0];
    this.singleton.day = this.day;
    this.singleton.weekTemperature = this.weekTemperature;
    // this.weather.getFiveDaysOfDailyForecasts(key).then((forecast : any) => {
    //   // Check if the city is already in favorites
    //   this.singleton.favorites.filter(obj => {
    //     if(obj.city === this.city){
    //       this.isFavorite = true;
    //     }
    //   });
    //   // Set variables to show on screen
    //   forecast.DailyForecasts.forEach((day) => {
    //     this.day[i] = this.utcDayToWeekDay(day.EpochDate);
    //     this.weekTemperature[i] = parseInt(fahrenheitToCelsius(day.Temperature.Maximum.Value) , 0);
    //     this.weekSunState[i] = day.Day.PrecipitationType;
    //     ++i;
    //   })
    //   if(this.myControl.value){
    //     this.isFavorite = false;
    //     this.city = this.myControl.value;
    //   }
    //   // Set today and singleton
    //   this.temperature = this.weekTemperature[0];
    //   this.singleton.day = this.day;
    //   this.singleton.weekTemperature = this.weekTemperature;
    // }).catch(err => {
    //   this.wrongCity = true;
    // })
  }

  // Convert utc day to week day
  utcDayToWeekDay(utcDate){
    const date = new Date(utcDate * 1000);
    return this.enumDate[date.getUTCDay()];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Set city weather to favorite and store it in singleton
  setFavorite(){
    if(this.isFavorite){
      this.isFavorite = false;
      this.singleton.favorites = this.singleton.favorites.filter(obj => obj.city !== this.city);
      console.log(this.singleton.favorites)
    }
    else{
      this.isFavorite = true;
      const favoriteToPush = {
        city: this.city,
        temperature: this.weekTemperature[0],
        sunType: this.weekSunState[0]
      }
      this.singleton.favorites.push(favoriteToPush);
      console.log(this.singleton.favorites)
    }
  }
}
