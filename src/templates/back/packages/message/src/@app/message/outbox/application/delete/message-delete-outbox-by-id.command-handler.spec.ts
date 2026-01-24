import {
  MessageDeleteOutboxByIdCommand,
  messageMockOutboxData,
} from '@app/message/outbox';
import { MessageDeleteOutboxByIdCommandHandler } from '@app/message/outbox/application/delete/message-delete-outbox-by-id.command-handler';
import { MessageDeleteOutboxByIdService } from '@app/message/outbox/application/delete/message-delete-outbox-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxByIdCommandHandler', () => {
  let commandHandler: MessageDeleteOutboxByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageDeleteOutboxByIdCommandHandler,
        {
          provide: MessageDeleteOutboxByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<MessageDeleteOutboxByIdCommandHandler>(
      MessageDeleteOutboxByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('MessageDeleteOutboxByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the MessageDeleteOutboxByIdService', async () => {
      expect(
        await commandHandler.execute(
          new MessageDeleteOutboxByIdCommand(messageMockOutboxData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
