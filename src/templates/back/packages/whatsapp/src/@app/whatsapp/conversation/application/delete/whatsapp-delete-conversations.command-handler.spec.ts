import { WhatsappDeleteConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappDeleteConversationsCommandHandler } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversations.command-handler';
import { WhatsappDeleteConversationsService } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationsCommandHandler', () =>
{
    let commandHandler: WhatsappDeleteConversationsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappDeleteConversationsCommandHandler,
                {
                    provide : WhatsappDeleteConversationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappDeleteConversationsCommandHandler>(WhatsappDeleteConversationsCommandHandler);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteConversationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappDeleteConversationsCommand(),
            )).toBe(undefined);
        });
    });
});
