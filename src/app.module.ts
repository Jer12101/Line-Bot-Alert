import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineController } from './line/line.controller';
import { LineService } from './line/line.service';
import { RssService } from './rss/rss.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { CommandService } from './command/command.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LineSubscriber } from './line/entities/line-subscriber.entity'; // path will vary
import { LineSubscriberService } from './line-subscriber/line-subscriber.service';
import { WeatherService } from './weather/weather.service';
import { ClockService } from './clock/clock.service';
import { StockService } from './stock/stock.service';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'line-subscribers.db', // This file will be created automatically
      models: [LineSubscriber],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([LineSubscriber]),
  ],
  controllers: [AppController, LineController],
  providers: [AppService, LineService, RssService, SchedulerService, CommandService, LineSubscriberService, WeatherService, ClockService, StockService],
})
export class AppModule {}
