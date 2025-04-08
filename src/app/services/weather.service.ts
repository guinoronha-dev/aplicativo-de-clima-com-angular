import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather} from '../interface/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  API: string = 'https://api.openweathermap.org/data/2.5/weather?APPID='
  key: string = '9a592835d3af0bd4f1bacbd89308565c'


  constructor(private http: HttpClient) { }

  getWeather(city: string) : Observable<Weather>{
    const URL: string = this.API + this.key + '&q=' + city + '&lang=pt_br';
    
    return this.http.get<Weather>(URL)
  }
}
