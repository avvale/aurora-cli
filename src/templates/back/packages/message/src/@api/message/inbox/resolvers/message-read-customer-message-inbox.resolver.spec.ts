/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageReadCustomerMessageInboxHandler } from '../handlers/message-read-customer-message-inbox.handler';
import { MessageReadCustomerMessageInboxResolver } from './message-read-customer-message-inbox.resolver';

describe('MessageReadCustomerMessageInboxResolver', () => {
  let resolver: MessageReadCustomerMessageInboxResolver;
  let handler: MessageReadCustomerMessageInboxHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageReadCustomerMessageInboxResolver,
        {
          provide: MessageReadCustomerMessageInboxHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageReadCustomerMessageInboxResolver>(
      MessageReadCustomerMessageInboxResolver,
    );
    handler = module.get<MessageReadCustomerMessageInboxHandler>(
      MessageReadCustomerMessageInboxHandler,
    );
  });

  test('MessageReadCustomerMessageInboxResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageReadCustomerMessageInboxResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
