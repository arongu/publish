export { WeatherData, WEATHER_PROXY_HANDLER }

class WeatherData {
    constructor(cityName, description, country, longitude, latitude) {
        this.cityName    = cityName;
        this.description = description;
        this.country     = country;
        this.longitude   = longitude;
        this.latitude    = latitude;
        this.temperature = '';
    }
}

const WEATHER_PROXY_HANDLER = {
    get: (target, propertyName) => {
        return Reflect.get(target, propertyName);
    },
    set: (target, propertyKey, value) => {
        const newValue = (value - 273.15).toFixed(2) + ' °C';
        return Reflect.set(target, propertyKey, newValue);
    }
}
