import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  day = [];
  weekTemperature = [];
  favorites = [];

  constructor() { }
}
