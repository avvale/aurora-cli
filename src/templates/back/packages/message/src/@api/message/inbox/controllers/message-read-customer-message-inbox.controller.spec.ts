/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageReadCustomerMessageInboxHandler } from '../handlers/message-read-customer-message-inbox.handler';
import { MessageReadCustomerMessageInboxController } from './message-read-customer-message-inbox.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageReadCustomerMessageInboxController', () =>
{
    let controller: MessageReadCustomerMessageInboxController;
    let handler: MessageReadCustomerMessageInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageReadCustomerMessageInboxController,
            ],
            providers: [
                {
                    provide : MessageReadCustomerMessageInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageReadCustomerMessageInboxController>(MessageReadCustomerMessageInboxController);
        handler = module.get<MessageReadCustomerMessageInboxHandler>(MessageReadCustomerMessageInboxHandler);
    });

    describe('main', () =>
    {
        test('MessageReadCustomerMessageInboxController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});