import { WhatsappDeleteMessagesCommand } from '@app/whatsapp/message';
import { WhatsappDeleteMessagesCommandHandler } from '@app/whatsapp/message/application/delete/whatsapp-delete-messages.command-handler';
import { WhatsappDeleteMessagesService } from '@app/whatsapp/message/application/delete/whatsapp-delete-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessagesCommandHandler', () =>
{
    let commandHandler: WhatsappDeleteMessagesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappDeleteMessagesCommandHandler,
                {
                    provide : WhatsappDeleteMessagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappDeleteMessagesCommandHandler>(WhatsappDeleteMessagesCommandHandler);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteMessagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappDeleteMessagesCommand(),
            )).toBe(undefined);
        });
    });
});
