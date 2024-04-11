import { MessageCreateOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxesHandler', () =>
{
    let handler: MessageCreateOutboxesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateOutboxesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<MessageCreateOutboxesHandler>(MessageCreateOutboxesHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateOutboxesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an messageMockOutboxData created', async () =>
        {
            expect(await handler.main(messageMockOutboxData)).toBe(true);
        });
    });
});
