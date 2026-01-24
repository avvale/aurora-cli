/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappFindTimelineHandler,
  WhatsappFindTimelineResolver,
} from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineResolver', () => {
  let resolver: WhatsappFindTimelineResolver;
  let handler: WhatsappFindTimelineHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappFindTimelineResolver,
        {
          provide: WhatsappFindTimelineHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappFindTimelineResolver>(
      WhatsappFindTimelineResolver,
    );
    handler = module.get<WhatsappFindTimelineHandler>(
      WhatsappFindTimelineHandler,
    );
  });

  test('WhatsappFindTimelineResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappFindTimelineResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a timeline', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData[0])),
        );
      expect(await resolver.main()).toBe(whatsappMockTimelineData[0]);
    });
  });
});
