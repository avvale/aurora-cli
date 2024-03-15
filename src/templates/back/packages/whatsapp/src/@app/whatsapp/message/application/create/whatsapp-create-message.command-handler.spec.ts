import { WhatsappCreateMessageCommandHandler } from './whatsapp-create-message.command-handler';
import { WhatsappCreateMessageService } from './whatsapp-create-message.service';
import { WhatsappCreateMessageCommand, whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessageCommandHandler', () =>
{
    let commandHandler: WhatsappCreateMessageCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateMessageCommandHandler,
                {
                    provide : WhatsappCreateMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappCreateMessageCommandHandler>(WhatsappCreateMessageCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateMessageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the WhatsappCreateMessageService', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappCreateMessageCommand(
                    {
                        id: whatsappMockMessageData[0].id,
                        whatsappMessageId: whatsappMockMessageData[0].whatsappMessageId,
                        conversationId: whatsappMockMessageData[0].conversationId,
                        direction: whatsappMockMessageData[0].direction,
                        accountId: whatsappMockMessageData[0].accountId,
                        displayPhoneNumber: whatsappMockMessageData[0].displayPhoneNumber,
                        phoneNumberId: whatsappMockMessageData[0].phoneNumberId,
                        type: whatsappMockMessageData[0].type,
                        payload: whatsappMockMessageData[0].payload,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
