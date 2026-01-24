/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindTimelineByIdHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineByIdHandler', () => {
  let handler: WhatsappFindTimelineByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappFindTimelineByIdHandler,
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

    handler = module.get<WhatsappFindTimelineByIdHandler>(
      WhatsappFindTimelineByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappFindTimelineByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappFindTimelineByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an timeline by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData[0])),
        );
      expect(
        await handler.main(whatsappMockTimelineData[0].id, {}, 'Europe/Madrid'),
      ).toBe(whatsappMockTimelineData[0]);
    });
  });
});
