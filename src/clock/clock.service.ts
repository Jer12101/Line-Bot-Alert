import * as moment from 'moment-timezone';
import * as cityTimezones from 'city-timezones';
import { Injectable } from '@nestjs/common';
import { formatTime, formatTimeList } from 'src/templates/time.templates';

@Injectable()
export class ClockService {
    private readonly defaultTimeZone = 'Asia/Taipei';

    private readonly cityToTimeZoneMap: Record<string, { label: string; tz: string }> = {
        taipei: { label: 'Taipei', tz: 'Asia/Taipei' },
        tokyo: { label: 'Tokyo', tz: 'Asia/Tokyo' },
        seoul: { label: 'Seoul', tz: 'Asia/Seoul' },
        newyork: { label: 'New York', tz: 'America/New_York' },
        london: { label: 'London', tz: 'Europe/London' },
        paris: { label: 'Paris', tz: 'Europe/Paris' },
        sydney: { label: 'Sydney', tz: 'Australia/Sydney' },
        losangeles: { label: 'Los Angeles', tz: 'America/Los_Angeles' },
        chicago: { label: 'Chicago', tz: 'America/Chicago' },
        berlin: { label: 'Berlin', tz: 'Europe/Berlin' },
        beijing: { label: 'Beijing', tz: 'Asia/Shanghai' },
    };

    getTime(city: string, lang: 'en' | 'zh' = 'en'): string {
        const cityQuery = city.trim();

        const matches = cityTimezones.lookupViaCity(cityQuery);
        const bestMatch = matches[0]; // or do fuzzy ranking later

        if (!bestMatch) {
            return lang === 'zh'
            ? `⚠️ 無法辨識的城市或時區：「${city}」`
            : `⚠️ Unknown city or timezone: "${city}"`;
        }

        const zone = bestMatch.timezone;
        const now = moment().tz(zone).format('dddd, MMM D, YYYY h:mm A');

        return formatTime(bestMatch.city, now, zone, lang);
    }


    
    getTimeList(lang: 'en' | 'zh' = 'en'): string {
        const now = moment();
        const timeEntries = Object.values(this.cityToTimeZoneMap).map(entry => {
            return {
                label: entry.label,
                time: now.tz(entry.tz).format('HH:mm'),
            }
        });

        return formatTimeList(timeEntries, lang);
    }


    private formatCityName(key: string): string {
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
}

