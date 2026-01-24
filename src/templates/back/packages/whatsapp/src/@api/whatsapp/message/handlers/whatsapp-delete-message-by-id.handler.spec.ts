/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteMessageByIdHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessageByIdController', () => {
  let handler: WhatsappDeleteMessageByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteMessageByIdHandler,
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

    handler = module.get<WhatsappDeleteMessageByIdHandler>(
      WhatsappDeleteMessageByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('WhatsappDeleteMessageByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an message deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData[0])),
        );
      expect(
        await handler.main(whatsappMockMessageData[0].id, {}, 'Europe/Madrid'),
      ).toBe(whatsappMockMessageData[0]);
    });
  });
});
