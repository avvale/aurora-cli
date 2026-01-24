/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteTimelinesHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelinesHandler', () => {
  let handler: WhatsappDeleteTimelinesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteTimelinesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<WhatsappDeleteTimelinesHandler>(
      WhatsappDeleteTimelinesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappDeleteTimelinesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappDeleteTimelinesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an whatsappMockTimelineData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        whatsappMockTimelineData,
      );
    });
  });
});
