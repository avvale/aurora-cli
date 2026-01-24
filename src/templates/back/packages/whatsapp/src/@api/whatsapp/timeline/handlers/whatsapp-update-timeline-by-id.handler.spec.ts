/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateTimelineByIdInput } from '@api/graphql';
import { WhatsappUpdateTimelineByIdHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelineByIdHandler', () => {
  let handler: WhatsappUpdateTimelineByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappUpdateTimelineByIdHandler,
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

    handler = module.get<WhatsappUpdateTimelineByIdHandler>(
      WhatsappUpdateTimelineByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappUpdateTimelineByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappUpdateTimelineByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a timeline updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData[0])),
        );
      expect(
        await handler.main(
          <WhatsappUpdateTimelineByIdInput>whatsappMockTimelineData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(whatsappMockTimelineData[0]);
    });
  });
});
