/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageSendMessageMessageHandler } from '../handlers/message-send-message-message.handler';
import { MessageSendMessageMessageController } from './message-send-message-message.controller';

describe('MessageSendMessageMessageController', () => {
    let controller: MessageSendMessageMessageController;
    let handler: MessageSendMessageMessageHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageSendMessageMessageController],
            providers: [
                {
                    provide: MessageSendMessageMessageHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageSendMessageMessageController>(
            MessageSendMessageMessageController,
        );
        handler = module.get<MessageSendMessageMessageHandler>(
            MessageSendMessageMessageHandler,
        );
    });

    describe('main', () => {
        test('MessageSendMessageMessageController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
