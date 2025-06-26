import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { formatWeather } from 'src/templates/weather.template';

@Injectable()
export class WeatherService {
    private readonly API_KEY = process.env.WEATHER_API_KEY;

    async getWeather(city = 'Taipei', lang: 'en' | 'zh' = 'en'): Promise<string> {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    units: 'metric',
                    appid: this.API_KEY,
                    lang: lang === 'zh' ? 'zh_tw' : 'en'
                },
            },
        );

        const data = response.data;
        const weatherData = {
            temp: data.main.temp,
            description: data.weather[0].description,
        };

        return formatWeather(city, weatherData, lang);
    } catch (error) {
            console.error('❌ Failed to fetch weather:', error.response?.data || error.message);

            return lang === 'zh'
            ? `⚠️ 無法取得 "${city}" 的天氣資訊。請試試：/天氣 台北`
            : `⚠️ Couldn't fetch weather for "${city}". Try something like: /weather Taipei`;
        }
    }
}
