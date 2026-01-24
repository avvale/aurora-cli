/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageFindCustomerMessageInboxHandler } from '../handlers/message-find-customer-message-inbox.handler';
import { MessageFindCustomerMessageInboxController } from './message-find-customer-message-inbox.controller';

describe('MessageFindCustomerMessageInboxController', () => {
  let controller: MessageFindCustomerMessageInboxController;
  let handler: MessageFindCustomerMessageInboxHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageFindCustomerMessageInboxController],
      providers: [
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

    controller = module.get<MessageFindCustomerMessageInboxController>(
      MessageFindCustomerMessageInboxController,
    );
    handler = module.get<MessageFindCustomerMessageInboxHandler>(
      MessageFindCustomerMessageInboxHandler,
    );
  });

  describe('main', () => {
    test('MessageFindCustomerMessageInboxController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
