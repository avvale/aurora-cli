/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappDeleteTimelinesHandler,
  WhatsappDeleteTimelinesResolver,
} from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelinesResolver', () => {
  let resolver: WhatsappDeleteTimelinesResolver;
  let handler: WhatsappDeleteTimelinesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteTimelinesResolver,
        {
          provide: WhatsappDeleteTimelinesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappDeleteTimelinesResolver>(
      WhatsappDeleteTimelinesResolver,
    );
    handler = module.get<WhatsappDeleteTimelinesHandler>(
      WhatsappDeleteTimelinesHandler,
    );
  });

  test('WhatsappDeleteTimelinesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappDeleteTimelinesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an whatsappMockTimelineData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData)),
        );
      expect(await resolver.main()).toBe(whatsappMockTimelineData);
    });
  });
});
