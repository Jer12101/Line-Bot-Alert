import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
    private readonly API_KEY = process.env.WEATHER_API_KEY;

    async getWeather(city = 'Taipei'): Promise<string> {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    units: 'metric',
                    appid: this.API_KEY,
                },
            },
        );

        const data = response.data;
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;

        return `🌤️ Weather in ${city}:\n${weather}, ${temp}°C (feels like ${feelsLike}°C)`;
        } catch (error) {
            console.error('❌ Failed to fetch weather:', error.response?.data || error.message);
            return `⚠️ Couldn't fetch weather for "${city}". Try something like: /weather Taipei`;
        }
    }
}
