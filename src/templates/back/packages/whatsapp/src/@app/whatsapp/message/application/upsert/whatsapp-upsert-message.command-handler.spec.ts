import { whatsappMockMessageData, WhatsappUpsertMessageCommand } from '@app/whatsapp/message';
import { WhatsappUpsertMessageCommandHandler } from '@app/whatsapp/message/application/upsert/whatsapp-upsert-message.command-handler';
import { WhatsappUpsertMessageService } from '@app/whatsapp/message/application/upsert/whatsapp-upsert-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertMessageCommandHandler', () =>
{
    let commandHandler: WhatsappUpsertMessageCommandHandler;
    let service: WhatsappUpsertMessageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpsertMessageCommandHandler,
                {
                    provide : WhatsappUpsertMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpsertMessageCommandHandler>(WhatsappUpsertMessageCommandHandler);
        service = module.get<WhatsappUpsertMessageService>(WhatsappUpsertMessageService);
    });

    describe('main', () =>
    {
        test('UpsertMessageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the WhatsappUpsertMessageService', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappUpsertMessageCommand(
                    {
                        id: whatsappMockMessageData[0].id,
                        wabaMessageId: whatsappMockMessageData[0].wabaMessageId,
                        timelineId: whatsappMockMessageData[0].timelineId,
                        conversationId: whatsappMockMessageData[0].conversationId,
                        statuses: whatsappMockMessageData[0].statuses,
                        direction: whatsappMockMessageData[0].direction,
                        accountId: whatsappMockMessageData[0].accountId,
                        wabaContactId: whatsappMockMessageData[0].wabaContactId,
                        contactName: whatsappMockMessageData[0].contactName,
                        type: whatsappMockMessageData[0].type,
                        payload: whatsappMockMessageData[0].payload,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
