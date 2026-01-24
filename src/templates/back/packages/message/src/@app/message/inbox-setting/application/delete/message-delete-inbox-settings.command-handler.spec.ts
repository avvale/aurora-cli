import { MessageDeleteInboxSettingsCommand } from '@app/message/inbox-setting';
import { MessageDeleteInboxSettingsCommandHandler } from '@app/message/inbox-setting/application/delete/message-delete-inbox-settings.command-handler';
import { MessageDeleteInboxSettingsService } from '@app/message/inbox-setting/application/delete/message-delete-inbox-settings.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingsCommandHandler', () => {
  let commandHandler: MessageDeleteInboxSettingsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageDeleteInboxSettingsCommandHandler,
        {
          provide: MessageDeleteInboxSettingsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<MessageDeleteInboxSettingsCommandHandler>(
      MessageDeleteInboxSettingsCommandHandler,
    );
  });

  describe('main', () => {
    test('MessageDeleteInboxSettingsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(new MessageDeleteInboxSettingsCommand()),
      ).toBe(undefined);
    });
  });
});
