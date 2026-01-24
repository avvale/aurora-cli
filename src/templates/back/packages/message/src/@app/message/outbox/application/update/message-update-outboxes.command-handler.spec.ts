import {
  messageMockOutboxData,
  MessageUpdateOutboxesCommand,
} from '@app/message/outbox';
import { MessageUpdateOutboxesCommandHandler } from '@app/message/outbox/application/update/message-update-outboxes.command-handler';
import { MessageUpdateOutboxesService } from '@app/message/outbox/application/update/message-update-outboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxesCommandHandler', () => {
  let commandHandler: MessageUpdateOutboxesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageUpdateOutboxesCommandHandler,
        {
          provide: MessageUpdateOutboxesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<MessageUpdateOutboxesCommandHandler>(
      MessageUpdateOutboxesCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateOutboxesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an outboxes updated', async () => {
      expect(
        await commandHandler.execute(
          new MessageUpdateOutboxesCommand(
            {
              id: messageMockOutboxData[0].id,
              rowId: messageMockOutboxData[0].rowId,
              messageId: messageMockOutboxData[0].messageId,
              accountRecipientIds: messageMockOutboxData[0].accountRecipientIds,
              tenantRecipientIds: messageMockOutboxData[0].tenantRecipientIds,
              scopeRecipients: messageMockOutboxData[0].scopeRecipients,
              tagRecipients: messageMockOutboxData[0].tagRecipients,
              meta: messageMockOutboxData[0].meta,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
