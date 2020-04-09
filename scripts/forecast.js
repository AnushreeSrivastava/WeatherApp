class Forecast {
    constructor() {
        this.key = 'k6KA1UHAq74o4mB2bGrGGI5buFcGIFqM';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        const cityDetail = await this.getCity(city);
        const weather = await this.getWeather(cityDetail.Key);
        return { cityDetail, weather }
    }
    async getCity(city) {

        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(id) {

        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}
