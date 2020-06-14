import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { DateTime } from 'luxon';
import moment from 'moment';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css', '../../../assets/css/style.css']
})
export class WeatherWidgetMainComponent implements OnInit {
  WeatherData: any;
  timedate: any;

  constructor() { }
  
  
  ngOnInit(): void {
    this.initClockRotate();
    this.getWeatherData();
    console.log(this.WeatherData);
  }
  
  initClockRotate() {
    const date = moment(DateTime.local().setZone('America/New_York').toISO());
    const nytime = date.format('dddd');
    const nyday = date.format("MMM Do YY");
    const nyminuts = date.format('MMMM Do YYYY, h:mm:ss a');
    console.log(nytime);
    
    this.timedate = {};
    this.timedate.day = nytime;

    this.timedate.date = nyday;

    this.timedate.minut = nyminuts;
    
  }



  async getWeatherData() {
    //let data = JSON.parse('{ "coord": { "lon": 72.85, "lat": 19.01 }, "weather": [{ "id": 721, "main": "Haze", "description": "haze", "icon": "50n" }], "base": "stations", "main": { "temp": 297.15, "feels_like": 297.4, "temp_min": 297.15, "temp_max": 297.15, "pressure": 1013, "humidity": 69 }, "visibility": 3500, "wind": { "speed": 3.6, "deg": 300 }, "clouds": { "all": 20 }, "dt": 1580141589, "sys": { "type": 1, "id": 9052, "country": "IN", "sunrise": 1580089441, "sunset": 1580129884 }, "timezone": 19800, "id": 1275339, "name": "Mumbai", "cod": 200 }');
    let data = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=137f21ae1f6d7610e78b72ca6a2b6d9a').then(async data=>await data.json());
    this.setWeatherData(data);
  }

  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    
  }
}
