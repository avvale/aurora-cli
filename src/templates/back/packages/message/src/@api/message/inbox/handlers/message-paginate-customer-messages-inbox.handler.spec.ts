/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MessagePaginateCustomerMessagesInboxHandler } from './message-paginate-customer-messages-inbox.handler';

describe('MessagePaginateCustomerMessagesInboxHandler', () => {
  let handler: MessagePaginateCustomerMessagesInboxHandler;
  let queryBus: IQueryBus;
  let commandBus: ICommandBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessagePaginateCustomerMessagesInboxHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<MessagePaginateCustomerMessagesInboxHandler>(
      MessagePaginateCustomerMessagesInboxHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
    commandBus = module.get<ICommandBus>(ICommandBus);
  });

  describe('main', () => {
    test('MessagePaginateCustomerMessagesInboxHandler should be defined', () => {
      expect(handler).toBeDefined();
    });
  });
});
