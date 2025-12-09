/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageRemoveAttachmentMessageHandler } from '../handlers/message-remove-attachment-message.handler';
import { MessageRemoveAttachmentMessageController } from './message-remove-attachment-message.controller';

describe('MessageRemoveAttachmentMessageController', () => {
    let controller: MessageRemoveAttachmentMessageController;
    let handler: MessageRemoveAttachmentMessageHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageRemoveAttachmentMessageController],
            providers: [
                {
                    provide: MessageRemoveAttachmentMessageHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageRemoveAttachmentMessageController>(
            MessageRemoveAttachmentMessageController,
        );
        handler = module.get<MessageRemoveAttachmentMessageHandler>(
            MessageRemoveAttachmentMessageHandler,
        );
    });

    describe('main', () => {
        test('MessageRemoveAttachmentMessageController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
