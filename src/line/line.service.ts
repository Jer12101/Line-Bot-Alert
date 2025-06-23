import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LineService {
    private readonly LINE_API = 'https://api.line.me/v2/bot/message/push';
    private readonly TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

    async pushMessage(to: string, text: string): Promise<void> {
    try {
        await axios.post(
        this.LINE_API,
        {
            to,
            messages: [{ type: 'text', text }],
        },
        {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.TOKEN}`,
            },
        },
        );
        console.log(`✅ Sent message to LINE: ${text}`);
    } catch (err) {
        console.error('❌ Failed to push LINE message:', err?.response?.data || err.message);
    }
    }

    async pushFlexMessage(to: string, flexContent: any): Promise<void> {
    try {
        await axios.post(
        this.LINE_API,
        {
            to,
            messages: [
            {
                type: 'flex',
                altText: 'Stock Info',
                contents: flexContent,
            },
            ],
        },
        {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.TOKEN}`,
            },
        },
        );
        console.log(`✅ Sent Flex message to LINE`);
    } catch (err) {
        console.error('❌ Failed to push LINE Flex message:', err?.response?.data || err.message);
    }
}

    // ✅ Creates a Flex Message card for stock info
    /*createStockFlexMessage(
        symbol: string,
        price: number,
        change: number,
        changePercent: number,
        prevClose: number,
    ): any {
        const isPositive = change >= 0;

        return {
        type: 'flex',
        altText: `Stock quote for ${symbol.toUpperCase()}`,
        contents: {
            type: 'bubble',
            size: 'mega',
            body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            contents: [
                {
                type: 'text',
                text: `📈 ${symbol.toUpperCase()}`,
                weight: 'bold',
                size: 'xl',
                },
                {
                type: 'text',
                text: `Price: $${price.toFixed(2)} USD`,
                size: 'md',
                wrap: true,
                },
                {
                type: 'text',
                text: `Change: ${isPositive ? '🔺' : '🔻'} ${change.toFixed(2)} (${changePercent.toFixed(2)}%)`,
                color: isPositive ? '#00BB00' : '#FF4444',
                size: 'md',
                wrap: true,
                },
                {
                type: 'text',
                text: `Prev Close: $${prevClose.toFixed(2)} USD`,
                size: 'sm',
                color: '#999999',
                wrap: true,
                },
            ],
            },
        },
        };
    }*/
}
