/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCreateInboxSettingHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingHandler', () => {
  let handler: MessageCreateInboxSettingHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageCreateInboxSettingHandler,
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

    handler = module.get<MessageCreateInboxSettingHandler>(
      MessageCreateInboxSettingHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('MessageCreateInboxSettingHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an inboxSetting created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(messageMockInboxSettingData[0])),
        );
      expect(
        await handler.main(messageMockInboxSettingData[0], 'Europe/Madrid'),
      ).toBe(messageMockInboxSettingData[0]);
    });
  });
});
