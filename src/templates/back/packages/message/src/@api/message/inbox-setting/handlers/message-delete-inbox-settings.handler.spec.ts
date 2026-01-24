/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingsHandler', () => {
  let handler: MessageDeleteInboxSettingsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageDeleteInboxSettingsHandler,
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

    handler = module.get<MessageDeleteInboxSettingsHandler>(
      MessageDeleteInboxSettingsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageDeleteInboxSettingsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageDeleteInboxSettingsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an messageMockInboxSettingData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxSettingData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        messageMockInboxSettingData,
      );
    });
  });
});
