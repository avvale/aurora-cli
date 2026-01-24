/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessagePaginateCustomerMessagesInboxHandler } from '../handlers/message-paginate-customer-messages-inbox.handler';
import { MessagePaginateCustomerMessagesInboxController } from './message-paginate-customer-messages-inbox.controller';

describe('MessagePaginateCustomerMessagesInboxController', () => {
  let controller: MessagePaginateCustomerMessagesInboxController;
  let handler: MessagePaginateCustomerMessagesInboxHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessagePaginateCustomerMessagesInboxController],
      providers: [
        {
          provide: MessagePaginateCustomerMessagesInboxHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessagePaginateCustomerMessagesInboxController>(
      MessagePaginateCustomerMessagesInboxController,
    );
    handler = module.get<MessagePaginateCustomerMessagesInboxHandler>(
      MessagePaginateCustomerMessagesInboxHandler,
    );
  });

  describe('main', () => {
    test('MessagePaginateCustomerMessagesInboxController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
