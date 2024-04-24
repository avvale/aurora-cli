import { whatsappMockTimelineData, WhatsappUpdateTimelineByIdCommand } from '@app/whatsapp/timeline';
import { WhatsappUpdateTimelineByIdCommandHandler } from '@app/whatsapp/timeline/application/update/whatsapp-update-timeline-by-id.command-handler';
import { WhatsappUpdateTimelineByIdService } from '@app/whatsapp/timeline/application/update/whatsapp-update-timeline-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelineByIdCommandHandler', () =>
{
    let commandHandler: WhatsappUpdateTimelineByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpdateTimelineByIdCommandHandler,
                {
                    provide : WhatsappUpdateTimelineByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpdateTimelineByIdCommandHandler>(WhatsappUpdateTimelineByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateTimelineByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an timeline created', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappUpdateTimelineByIdCommand(
                    {
                        id: whatsappMockTimelineData[0].id,
                        accounts: whatsappMockTimelineData[0].accounts,
                        wabaPhoneNumberId: whatsappMockTimelineData[0].wabaPhoneNumberId,
                        wabaContactId: whatsappMockTimelineData[0].wabaContactId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
