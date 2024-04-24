import { WhatsappITimelineRepository, WhatsappMaxTimelineQuery, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappMaxTimelineQueryHandler } from '@app/whatsapp/timeline/application/max/whatsapp-max-timeline.query-handler';
import { WhatsappMaxTimelineService } from '@app/whatsapp/timeline/application/max/whatsapp-max-timeline.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMaxTimelineQueryHandler', () =>
{
    let queryHandler: WhatsappMaxTimelineQueryHandler;
    let service: WhatsappMaxTimelineService;
    let repository: WhatsappMockTimelineRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappMaxTimelineQueryHandler,
                {
                    provide : WhatsappITimelineRepository,
                    useClass: WhatsappMockTimelineRepository,
                },
                {
                    provide : WhatsappMaxTimelineService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappMaxTimelineQueryHandler>(WhatsappMaxTimelineQueryHandler);
        service = module.get<WhatsappMaxTimelineService>(WhatsappMaxTimelineService);
        repository = <WhatsappMockTimelineRepository>module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappMaxTimelineQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new WhatsappMaxTimelineQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
