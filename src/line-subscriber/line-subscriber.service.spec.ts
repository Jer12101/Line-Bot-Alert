import { Test, TestingModule } from '@nestjs/testing';
import { LineSubscriberService } from './line-subscriber.service';

describe('LineSubscriberService', () => {
  let service: LineSubscriberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineSubscriberService],
    }).compile();

    service = module.get<LineSubscriberService>(LineSubscriberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
