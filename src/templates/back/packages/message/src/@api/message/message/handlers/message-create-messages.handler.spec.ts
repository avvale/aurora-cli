import { MessageCreateMessagesHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessagesHandler', () =>
{
    let handler: MessageCreateMessagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateMessagesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<MessageCreateMessagesHandler>(MessageCreateMessagesHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateMessagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an messageMockMessageData created', async () =>
        {
            expect(await handler.main(messageMockMessageData)).toBe(true);
        });
    });
});
