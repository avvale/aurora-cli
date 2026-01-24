/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageSendMessageMessageHandler } from '../handlers/message-send-message-message.handler';
import { MessageSendMessageMessageResolver } from './message-send-message-message.resolver';

describe('MessageSendMessageMessageResolver', () => {
  let resolver: MessageSendMessageMessageResolver;
  let handler: MessageSendMessageMessageHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageSendMessageMessageResolver,
        {
          provide: MessageSendMessageMessageHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageSendMessageMessageResolver>(
      MessageSendMessageMessageResolver,
    );
    handler = module.get<MessageSendMessageMessageHandler>(
      MessageSendMessageMessageHandler,
    );
  });

  test('MessageSendMessageMessageResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageSendMessageMessageResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
