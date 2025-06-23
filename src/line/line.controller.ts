import { Controller, Post, Body, Headers } from '@nestjs/common';
import { LineService } from './line.service';
import { RssService } from 'src/rss/rss.service';
import { LineSubscriberService } from 'src/line-subscriber/line-subscriber.service';
import { WeatherService } from 'src/weather/weather.service';
import { ClockService } from 'src/clock/clock.service';
import { StockService } from 'src/stock/stock.service';

@Controller('webhook')
export class LineController {
    constructor(
        private readonly lineService: LineService,
        private readonly rssService: RssService,
        private readonly subscriberService: LineSubscriberService,
        private readonly weatherService: WeatherService,
        private readonly clockService: ClockService,
        private readonly stockService: StockService,
    ) {}
    @Post()
    async handleWebhook(@Body() body: any) {
    const events = body.events || [];

    for (const event of events) {
        const text = event.message?.text?.trim().toLowerCase();
        const userId = event.source?.userId;

        if (!userId || event.type !== 'message') continue;

        console.log('📥 Raw event:', JSON.stringify(event, null, 2));
        console.log('🔤 Parsed text:', text);

        if (text.startsWith('/weather')) {
            const city = text.split(' ').slice(1).join(' ') || 'Taipei';
            const report = await this.weatherService.getWeather(city);
            await this.lineService.pushMessage(userId, report);
            continue;
        }

        if (text.startsWith('/time')) {
            const city = text.split(' ').slice(1).join(' ').trim();

            if (!city) {
                const list = this.clockService.getTimeList();
                await this.lineService.pushMessage(userId, list);
            } else {
                const normalized = city.toLowerCase().replace(/\s+/g, '');
                const reply = this.clockService.getTime(normalized);
                await this.lineService.pushMessage(userId, reply);
            }

            continue;
        }

        if (text.startsWith('/stock')) {
            const query = text.split(' ').slice(1).join(' ');

            if (!query) {
                await this.lineService.pushMessage(userId, `
            💡 Usage: /stock [symbol or company name]

            Examples:
            • /stock AAPL – Apple
            • /stock TSLA – Tesla
            • /stock TSM – TSMC
            `);
                continue;
            }

            const symbol = await this.stockService.lookupSymbol(query);
            if (!symbol) {
                await this.lineService.pushMessage(userId, `❌ Could not find stock for: "${query}"`);
                continue;
            }

            const report = await this.stockService.getQuote(symbol);
            await this.lineService.pushMessage(userId, report);
            continue;
        }




        switch (text) {
        case '/subscribe': {
            const success = await this.subscriberService.subscribe(userId);
            const reply = success ? '✅ Subscribed!' : '⚠️ Already subscribed.';
            await this.lineService.pushMessage(userId, reply);
            break;
        }

        case '/unsubscribe': {
            const success = await this.subscriberService.unsubscribe(userId);
            const reply = success ? '❌ Unsubscribed.' : 'ℹ️ You weren’t subscribed.';
            await this.lineService.pushMessage(userId, reply);
            break;
        }

        case '/news': {
            const articles = await this.rssService.getLatestTechNews(5);
            for (const article of articles) {
                await this.lineService.pushMessage(userId, article);
            }
            break;
        }
        

        default:
            await this.lineService.pushMessage(userId, 
                `❓ Available Commands:
                • /news - Get the latest headlines
                • /weather [city] - Weather report for a city
                • /time [city] - Local time for major cities
                • /stock [symbol] - View stock details
                • /subscribe - Subscribe to auto news
                • /unsubscribe - Stop auto news`
            );
        }
    }

    /*for (const event of body.events) {
        const type = event.type;
        const messageText = event.message?.text || '';
        const sourceType = event.source?.type;
        const groupId = event.source?.groupId;
        const userId = event.source?.userId;

        console.log(`➡️ Event type: ${type}`);
        console.log(`💬 Message: ${messageText}`);
        console.log(`👥 Source: ${sourceType}`);
        console.log(`🔗 Group ID: ${groupId}`);
        console.log(`👤 User ID: ${userId}`);
    }*/

    return { status: 'ok' };
    }

}
