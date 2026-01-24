/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappPaginateTimelinesHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateTimelinesHandler', () => {
  let handler: WhatsappPaginateTimelinesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappPaginateTimelinesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<WhatsappPaginateTimelinesHandler>(
      WhatsappPaginateTimelinesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappPaginateTimelinesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappPaginateTimelinesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a timelines', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: whatsappMockTimelineData.length,
              count: whatsappMockTimelineData.length,
              rows: whatsappMockTimelineData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: whatsappMockTimelineData.length,
        count: whatsappMockTimelineData.length,
        rows: whatsappMockTimelineData,
      });
    });
  });
});
