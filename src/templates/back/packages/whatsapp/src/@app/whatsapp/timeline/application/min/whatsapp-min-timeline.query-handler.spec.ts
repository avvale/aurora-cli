import { WhatsappITimelineRepository, WhatsappMinTimelineQuery, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappMinTimelineQueryHandler } from '@app/whatsapp/timeline/application/min/whatsapp-min-timeline.query-handler';
import { WhatsappMinTimelineService } from '@app/whatsapp/timeline/application/min/whatsapp-min-timeline.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMinTimelineQueryHandler', () =>
{
    let queryHandler: WhatsappMinTimelineQueryHandler;
    let service: WhatsappMinTimelineService;
    let repository: WhatsappMockTimelineRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappMinTimelineQueryHandler,
                {
                    provide : WhatsappITimelineRepository,
                    useClass: WhatsappMockTimelineRepository,
                },
                {
                    provide : WhatsappMinTimelineService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappMinTimelineQueryHandler>(WhatsappMinTimelineQueryHandler);
        service = module.get<WhatsappMinTimelineService>(WhatsappMinTimelineService);
        repository = <WhatsappMockTimelineRepository>module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappMinTimelineQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new WhatsappMinTimelineQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
