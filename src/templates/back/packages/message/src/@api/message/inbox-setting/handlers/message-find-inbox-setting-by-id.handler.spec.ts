/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindInboxSettingByIdHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingByIdHandler', () => {
  let handler: MessageFindInboxSettingByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageFindInboxSettingByIdHandler,
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

    handler = module.get<MessageFindInboxSettingByIdHandler>(
      MessageFindInboxSettingByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageFindInboxSettingByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageFindInboxSettingByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an inboxSetting by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(messageMockInboxSettingData[0])),
        );
      expect(
        await handler.main(
          messageMockInboxSettingData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(messageMockInboxSettingData[0]);
    });
  });
});
