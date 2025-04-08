import { Component, Pipe } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [FormsModule, DecimalPipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  city: string = '';
  temperature: number = 0;
  humidity: number = 0;
  weatherDescription: string = '';
  weatherIconURL: string = '';
  query: boolean = false;
  error: boolean = false;
  currentTime: string = '';
  currentCity: string = '';
  wind: number = 0;
  fellsLike: number = 0;
  tempMin: number = 0;
  tempMax: number = 0;
  pressure: number = 0;
  clouds: number = 0;
  visibility: number = 0;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.updateDateTime();
    setInterval(this.updateDateTime.bind(this), 1000);
  }
  updateDateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit', minute: '2-digit'
    });
  }

  validateInput() {
    this.error = this.city.trim() === '' ? true : false;
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.query = true;
        this.temperature = data.main.temp - 273.15;
        this.humidity = data.main.humidity;
        this.weatherDescription = data.weather[0].description;
        this.weatherIconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        this.currentCity = data.name;
        this.wind = data.wind.speed;
        this.fellsLike = data.main.feels_like - 273.15;
        this.tempMin = data.main.temp_min - 273.15;
        this.tempMax = data.main.temp_max - 273.15;
        this.pressure = data.main.pressure;
        this.clouds = data.clouds.all;
        this.visibility = data.visibility
      },
      error: (e) => {
        this.query = false;
        this.error = true;
        this.city = '';
        this.wind = 0;
        this.humidity = 0;
        this.fellsLike = 0;
        this.tempMin = 0;
        this.tempMax = 0;
        this.pressure = 0;
        this.clouds = 0;
        this.visibility = 0;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    })
  }
}
