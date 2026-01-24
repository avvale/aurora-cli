import {
  MessageDeleteInboxByIdCommand,
  messageMockInboxData,
} from '@app/message/inbox';
import { MessageDeleteInboxByIdCommandHandler } from '@app/message/inbox/application/delete/message-delete-inbox-by-id.command-handler';
import { MessageDeleteInboxByIdService } from '@app/message/inbox/application/delete/message-delete-inbox-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxByIdCommandHandler', () => {
  let commandHandler: MessageDeleteInboxByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageDeleteInboxByIdCommandHandler,
        {
          provide: MessageDeleteInboxByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<MessageDeleteInboxByIdCommandHandler>(
      MessageDeleteInboxByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('MessageDeleteInboxByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the MessageDeleteInboxByIdService', async () => {
      expect(
        await commandHandler.execute(
          new MessageDeleteInboxByIdCommand(messageMockInboxData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
