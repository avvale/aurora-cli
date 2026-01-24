import {
  messageMockInboxSettingData,
  MessageUpdateInboxSettingByIdCommand,
} from '@app/message/inbox-setting';
import { MessageUpdateInboxSettingByIdCommandHandler } from '@app/message/inbox-setting/application/update/message-update-inbox-setting-by-id.command-handler';
import { MessageUpdateInboxSettingByIdService } from '@app/message/inbox-setting/application/update/message-update-inbox-setting-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingByIdCommandHandler', () => {
  let commandHandler: MessageUpdateInboxSettingByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageUpdateInboxSettingByIdCommandHandler,
        {
          provide: MessageUpdateInboxSettingByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<MessageUpdateInboxSettingByIdCommandHandler>(
      MessageUpdateInboxSettingByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateInboxSettingByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an inboxSetting created', async () => {
      expect(
        await commandHandler.execute(
          new MessageUpdateInboxSettingByIdCommand(
            {
              id: messageMockInboxSettingData[0].id,
              rowId: messageMockInboxSettingData[0].rowId,
              accountId: messageMockInboxSettingData[0].accountId,
              lastReadMessageRowId:
                messageMockInboxSettingData[0].lastReadMessageRowId,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
