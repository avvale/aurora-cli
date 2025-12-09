/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageDeleteCustomerMessageInboxHandler } from '../handlers/message-delete-customer-message-inbox.handler';
import { MessageDeleteCustomerMessageInboxController } from './message-delete-customer-message-inbox.controller';

describe('MessageDeleteCustomerMessageInboxController', () => {
    let controller: MessageDeleteCustomerMessageInboxController;
    let handler: MessageDeleteCustomerMessageInboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageDeleteCustomerMessageInboxController],
            providers: [
                {
                    provide: MessageDeleteCustomerMessageInboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageDeleteCustomerMessageInboxController>(
            MessageDeleteCustomerMessageInboxController,
        );
        handler = module.get<MessageDeleteCustomerMessageInboxHandler>(
            MessageDeleteCustomerMessageInboxHandler,
        );
    });

    describe('main', () => {
        test('MessageDeleteCustomerMessageInboxController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
