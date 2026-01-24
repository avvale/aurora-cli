/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageGetInboxSettingsHandler,
  MessageGetInboxSettingsResolver,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetInboxSettingsResolver', () => {
  let resolver: MessageGetInboxSettingsResolver;
  let handler: MessageGetInboxSettingsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageGetInboxSettingsResolver,
        {
          provide: MessageGetInboxSettingsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageGetInboxSettingsResolver>(
      MessageGetInboxSettingsResolver,
    );
    handler = module.get<MessageGetInboxSettingsHandler>(
      MessageGetInboxSettingsHandler,
    );
  });

  test('MessageGetInboxSettingsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageGetInboxSettingsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a messageMockInboxSettingData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxSettingData)),
        );
      expect(await resolver.main()).toBe(messageMockInboxSettingData);
    });
  });
});
