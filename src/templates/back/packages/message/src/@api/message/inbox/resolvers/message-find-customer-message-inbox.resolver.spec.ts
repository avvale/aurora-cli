/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageFindCustomerMessageInboxHandler } from '../handlers/message-find-customer-message-inbox.handler';
import { MessageFindCustomerMessageInboxResolver } from './message-find-customer-message-inbox.resolver';

describe('MessageFindCustomerMessageInboxResolver', () => {
  let resolver: MessageFindCustomerMessageInboxResolver;
  let handler: MessageFindCustomerMessageInboxHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageFindCustomerMessageInboxResolver,
        {
          provide: MessageFindCustomerMessageInboxHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageFindCustomerMessageInboxResolver>(
      MessageFindCustomerMessageInboxResolver,
    );
    handler = module.get<MessageFindCustomerMessageInboxHandler>(
      MessageFindCustomerMessageInboxHandler,
    );
  });

  test('MessageFindCustomerMessageInboxResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageFindCustomerMessageInboxResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
