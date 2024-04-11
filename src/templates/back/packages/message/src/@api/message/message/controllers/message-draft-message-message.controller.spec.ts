/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDraftMessageMessageHandler } from '../handlers/message-draft-message-message.handler';
import { MessageDraftMessageMessageController } from './message-draft-message-message.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDraftMessageMessageController', () =>
{
    let controller: MessageDraftMessageMessageController;
    let handler: MessageDraftMessageMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageDraftMessageMessageController,
            ],
            providers: [
                {
                    provide : MessageDraftMessageMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageDraftMessageMessageController>(MessageDraftMessageMessageController);
        handler = module.get<MessageDraftMessageMessageHandler>(MessageDraftMessageMessageHandler);
    });

    describe('main', () =>
    {
        test('MessageDraftMessageMessageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});