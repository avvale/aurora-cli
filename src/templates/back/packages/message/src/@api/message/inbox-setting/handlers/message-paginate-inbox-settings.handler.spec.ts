/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessagePaginateInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxSettingsHandler', () => {
  let handler: MessagePaginateInboxSettingsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessagePaginateInboxSettingsHandler,
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

    handler = module.get<MessagePaginateInboxSettingsHandler>(
      MessagePaginateInboxSettingsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessagePaginateInboxSettingsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessagePaginateInboxSettingsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a inboxSettings', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: messageMockInboxSettingData.length,
              count: messageMockInboxSettingData.length,
              rows: messageMockInboxSettingData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: messageMockInboxSettingData.length,
        count: messageMockInboxSettingData.length,
        rows: messageMockInboxSettingData,
      });
    });
  });
});
