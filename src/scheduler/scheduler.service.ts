// src/scheduler/scheduler.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { LineService } from '../line/line.service';
import { RssService } from '../rss/rss.service';
import { LineSubscriberService } from 'src/line-subscriber/line-subscriber.service';

@Injectable()
export class SchedulerService implements OnModuleInit {
  // TODO: Replace this with a persistent userId list
    

    constructor(
        private readonly lineService: LineService,
        private readonly rssService: RssService,
        private readonly subscriberService: LineSubscriberService,
    ) {}

    onModuleInit() {
        // Runs at 9:00 AM every day
        cron.schedule('0 9,22 * * *', async () => {
            console.log('🕘 Running daily news push (9AM or 10PM)...');

            const headlines = await this.rssService.getLatestTechNews(5);
            const userIds = await this.subscriberService.getAllUserIds();
            for (const userId of userIds) {
                for (const article of headlines) {
                    await this.lineService.pushMessage(userId, article);
                }
            }
        });
    }
}

