import { whatsappMockTimelineData, WhatsappUpsertTimelineCommand } from '@app/whatsapp/timeline';
import { WhatsappUpsertTimelineCommandHandler } from '@app/whatsapp/timeline/application/upsert/whatsapp-upsert-timeline.command-handler';
import { WhatsappUpsertTimelineService } from '@app/whatsapp/timeline/application/upsert/whatsapp-upsert-timeline.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertTimelineCommandHandler', () =>
{
    let commandHandler: WhatsappUpsertTimelineCommandHandler;
    let service: WhatsappUpsertTimelineService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpsertTimelineCommandHandler,
                {
                    provide : WhatsappUpsertTimelineService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpsertTimelineCommandHandler>(WhatsappUpsertTimelineCommandHandler);
        service = module.get<WhatsappUpsertTimelineService>(WhatsappUpsertTimelineService);
    });

    describe('main', () =>
    {
        test('UpsertTimelineCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the WhatsappUpsertTimelineService', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappUpsertTimelineCommand(
                    {
                        id: whatsappMockTimelineData[0].id,
                        accounts: whatsappMockTimelineData[0].accounts,
                        wabaPhoneNumberId: whatsappMockTimelineData[0].wabaPhoneNumberId,
                        wabaContactId: whatsappMockTimelineData[0].wabaContactId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
