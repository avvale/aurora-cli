/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageCountUnreadCustomerMessageInboxHandler } from '../handlers/message-count-unread-customer-message-inbox.handler';
import { MessageCountUnreadCustomerMessageInboxController } from './message-count-unread-customer-message-inbox.controller';

describe('MessageCountUnreadCustomerMessageInboxController', () => {
  let controller: MessageCountUnreadCustomerMessageInboxController;
  let handler: MessageCountUnreadCustomerMessageInboxHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageCountUnreadCustomerMessageInboxController],
      providers: [
        {
          provide: MessageCountUnreadCustomerMessageInboxHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageCountUnreadCustomerMessageInboxController>(
      MessageCountUnreadCustomerMessageInboxController,
    );
    handler = module.get<MessageCountUnreadCustomerMessageInboxHandler>(
      MessageCountUnreadCustomerMessageInboxHandler,
    );
  });

  describe('main', () => {
    test('MessageCountUnreadCustomerMessageInboxController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
