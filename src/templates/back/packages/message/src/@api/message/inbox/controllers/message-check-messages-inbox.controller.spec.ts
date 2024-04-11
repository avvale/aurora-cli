/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCheckMessagesInboxHandler } from '../handlers/message-check-messages-inbox.handler';
import { MessageCheckMessagesInboxController } from './message-check-messages-inbox.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCheckMessagesInboxController', () =>
{
    let controller: MessageCheckMessagesInboxController;
    let handler: MessageCheckMessagesInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageCheckMessagesInboxController,
            ],
            providers: [
                {
                    provide : MessageCheckMessagesInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageCheckMessagesInboxController>(MessageCheckMessagesInboxController);
        handler = module.get<MessageCheckMessagesInboxHandler>(MessageCheckMessagesInboxHandler);
    });

    describe('main', () =>
    {
        test('MessageCheckMessagesInboxController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});