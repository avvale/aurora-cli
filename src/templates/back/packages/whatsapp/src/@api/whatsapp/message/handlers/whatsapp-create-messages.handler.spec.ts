import { WhatsappCreateMessagesHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessagesHandler', () =>
{
    let handler: WhatsappCreateMessagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateMessagesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappCreateMessagesHandler>(WhatsappCreateMessagesHandler);
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an whatsappMockMessageData created', async () =>
        {
            expect(await handler.main(whatsappMockMessageData)).toBe(true);
        });
    });
});
