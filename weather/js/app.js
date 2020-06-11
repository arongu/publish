import * as ELEMENTS from './elements.js';
import { Http } from './http.js';
import { WEATHER_PROXY_HANDLER, WeatherData } from "./weather_data.js";

const API_KEY = '91ffa981b9f3e20535f4496d68283f9f';
let divCounter = 0;

const addWeatherData = (weatherData) => {
    const cityWeatherDiv      = document.createElement('div');
    const cityWeatherId       = divCounter++;
    cityWeatherDiv.id         = 'cw' + cityWeatherId;
    cityWeatherDiv.className  = 'city-weather';

    const h1          = document.createElement('h1');
    const description = document.createElement('div');
    const temperature = document.createElement('div');
    const country     = document.createElement('div');
    const coordinate  = document.createElement('div');


    h1.textContent          = weatherData.cityName;
    country.textContent     = weatherData.country;
    description.textContent = weatherData.description;
    temperature.textContent = weatherData.temperature
    coordinate.textContent  = '(longitude, latitude): ' + weatherData.longitude + ', ' + weatherData.latitude;


    cityWeatherDiv.appendChild(h1);
    cityWeatherDiv.appendChild(country);
    cityWeatherDiv.appendChild(description);
    cityWeatherDiv.appendChild(temperature);
    cityWeatherDiv.appendChild(coordinate);


    ELEMENTS.ELEMENT_WEATHER_LIST.prepend(cityWeatherDiv);
}

const searchWeather = () => {
    const CITY_NAME = ELEMENTS.ELEMENT_INPUT_SEARCH_CITY.value.trim();
    if (CITY_NAME) {
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&appid=' + API_KEY;

        Http.fetchData(apiUrl).then(responseData => {
            const WEATHER_DATA = new WeatherData(
                CITY_NAME,
                responseData.weather[0].description,
                responseData.sys.country,
                responseData.coord.lon,
                responseData.coord.lat,
            );


            const WEATHER_PROXY       = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = responseData.main.temp;

            addWeatherData(WEATHER_PROXY);
            ELEMENTS.ELEMENT_INPUT_SEARCH_CITY.value = null;

        }).catch(error => alert(error))

    } else {
        console.log('nothing to do');
    }
}

ELEMENTS.ELEMENT_BUTTON_SEARCH_CITY.addEventListener('click', searchWeather);
ELEMENTS.ELEMENT_INPUT_SEARCH_CITY.addEventListener("keyup", (event) => { if(event.key === "Enter") searchWeather()});

