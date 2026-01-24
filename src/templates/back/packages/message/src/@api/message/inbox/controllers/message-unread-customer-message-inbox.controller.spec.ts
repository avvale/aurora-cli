/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageUnreadCustomerMessageInboxHandler } from '../handlers/message-unread-customer-message-inbox.handler';
import { MessageUnreadCustomerMessageInboxController } from './message-unread-customer-message-inbox.controller';

describe('MessageUnreadCustomerMessageInboxController', () => {
  let controller: MessageUnreadCustomerMessageInboxController;
  let handler: MessageUnreadCustomerMessageInboxHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageUnreadCustomerMessageInboxController],
      providers: [
        {
          provide: MessageUnreadCustomerMessageInboxHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageUnreadCustomerMessageInboxController>(
      MessageUnreadCustomerMessageInboxController,
    );
    handler = module.get<MessageUnreadCustomerMessageInboxHandler>(
      MessageUnreadCustomerMessageInboxHandler,
    );
  });

  describe('main', () => {
    test('MessageUnreadCustomerMessageInboxController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
