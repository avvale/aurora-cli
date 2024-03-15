import { WhatsappDeleteMessageByIdCommand, whatsappMockMessageData } from '@app/whatsapp/message';
import { WhatsappDeleteMessageByIdCommandHandler } from '@app/whatsapp/message/application/delete/whatsapp-delete-message-by-id.command-handler';
import { WhatsappDeleteMessageByIdService } from '@app/whatsapp/message/application/delete/whatsapp-delete-message-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessageByIdCommandHandler', () =>
{
    let commandHandler: WhatsappDeleteMessageByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappDeleteMessageByIdCommandHandler,
                {
                    provide : WhatsappDeleteMessageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappDeleteMessageByIdCommandHandler>(WhatsappDeleteMessageByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteMessageByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the WhatsappDeleteMessageByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappDeleteMessageByIdCommand(
                    whatsappMockMessageData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
