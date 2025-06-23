// src/stock/stock.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StockService {
    private readonly apiKey = process.env.FINNHUB_API_KEY;
    private readonly baseUrl = 'https://finnhub.io/api/v1';

    async getQuote(symbol: string): Promise<string> {
        try {
            const url = `${this.baseUrl}/quote?symbol=${symbol}&token=${this.apiKey}`;
            const res = await axios.get(url);
            const data = res.data;

            if (!data || !data.c) {
                return `⚠️ No data found for symbol: ${symbol}`;
            }

            const change = (data.d >= 0 ? '🔺' : '🔻') + data.d.toFixed(2);
            const percent = (data.dp >= 0 ? '+' : '') + data.dp.toFixed(2) + '%';

            return `📈 ${symbol.toUpperCase()}\n` +
                `Price: $${data.c.toFixed(2)} USD\n` +
                `Change: ${change} (${percent})\n` +
                `Prev Close: $${data.pc.toFixed(2)} USD`;
        } catch (err) {
            return `❌ Error fetching stock info for ${symbol}`;
        }
    }

    async lookupSymbol(query: string): Promise<string | null> {
        try {
            const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&token=${this.apiKey}`;
            const res = await axios.get(url);
            const results = res.data.result;

            if (results.length === 0) return null;

            // Prefer the first match
            return results[0].symbol;
        } catch (err) {
            return null;
        }
    }
}
