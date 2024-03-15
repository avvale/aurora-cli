import { WhatsappCreateConversationCommandHandler } from './whatsapp-create-conversation.command-handler';
import { WhatsappCreateConversationService } from './whatsapp-create-conversation.service';
import { WhatsappCreateConversationCommand, whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationCommandHandler', () =>
{
    let commandHandler: WhatsappCreateConversationCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateConversationCommandHandler,
                {
                    provide : WhatsappCreateConversationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappCreateConversationCommandHandler>(WhatsappCreateConversationCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateConversationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the WhatsappCreateConversationService', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappCreateConversationCommand(
                    {
                        id: whatsappMockConversationData[0].id,
                        accounts: whatsappMockConversationData[0].accounts,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
