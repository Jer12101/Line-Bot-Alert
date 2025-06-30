import { Test, TestingModule } from '@nestjs/testing';
import { DiscordSubscriberService } from './discord-subscriber.service';

describe('DiscordSubscriberService', () => {
  let service: DiscordSubscriberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordSubscriberService],
    }).compile();

    service = module.get<DiscordSubscriberService>(DiscordSubscriberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
