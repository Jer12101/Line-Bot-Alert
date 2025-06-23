// src/rss/rss.service.ts
import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class RssService {
    private parser = new Parser();
    private readonly techCrunchFeed = 'https://techcrunch.com/feed/';

    async getLatestTechNews(limit = 3): Promise<string[]> {
    const feed = await this.parser.parseURL(this.techCrunchFeed);
    return feed.items.slice(0, limit).map(item => `📰 ${item.title}\n🔗 ${item.link}`);
    }
}
