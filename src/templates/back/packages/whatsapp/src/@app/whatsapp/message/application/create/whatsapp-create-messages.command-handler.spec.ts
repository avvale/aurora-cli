import { WhatsappCreateMessagesCommand, whatsappMockMessageData } from '@app/whatsapp/message';
import { WhatsappCreateMessagesCommandHandler } from '@app/whatsapp/message/application/create/whatsapp-create-messages.command-handler';
import { WhatsappCreateMessagesService } from '@app/whatsapp/message/application/create/whatsapp-create-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('whatsappCreateMessagesCommandHandler', () =>
{
    let commandHandler: WhatsappCreateMessagesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateMessagesCommandHandler,
                {
                    provide : WhatsappCreateMessagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappCreateMessagesCommandHandler>(WhatsappCreateMessagesCommandHandler);
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return WhatsappMockMessageData created', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappCreateMessagesCommand(
                    whatsappMockMessageData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
