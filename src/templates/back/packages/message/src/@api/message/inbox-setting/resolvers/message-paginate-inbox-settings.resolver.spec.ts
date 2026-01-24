/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessagePaginateInboxSettingsHandler,
  MessagePaginateInboxSettingsResolver,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxSettingsResolver', () => {
  let resolver: MessagePaginateInboxSettingsResolver;
  let handler: MessagePaginateInboxSettingsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessagePaginateInboxSettingsResolver,
        {
          provide: MessagePaginateInboxSettingsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessagePaginateInboxSettingsResolver>(
      MessagePaginateInboxSettingsResolver,
    );
    handler = module.get<MessagePaginateInboxSettingsHandler>(
      MessagePaginateInboxSettingsHandler,
    );
  });

  test('MessagePaginateInboxSettingsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessagePaginateInboxSettingsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a messageMockInboxSettingData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: messageMockInboxSettingData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: messageMockInboxSettingData,
      });
    });
  });
});
