/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageCountTotalRecipientsMessageHandler } from '../handlers/message-count-total-recipients-message.handler';
import { MessageCountTotalRecipientsMessageController } from './message-count-total-recipients-message.controller';

describe('MessageCountTotalRecipientsMessageController', () => {
    let controller: MessageCountTotalRecipientsMessageController;
    let handler: MessageCountTotalRecipientsMessageHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageCountTotalRecipientsMessageController],
            providers: [
                {
                    provide: MessageCountTotalRecipientsMessageHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageCountTotalRecipientsMessageController>(
            MessageCountTotalRecipientsMessageController,
        );
        handler = module.get<MessageCountTotalRecipientsMessageHandler>(
            MessageCountTotalRecipientsMessageHandler,
        );
    });

    describe('main', () => {
        test('MessageCountTotalRecipientsMessageController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
