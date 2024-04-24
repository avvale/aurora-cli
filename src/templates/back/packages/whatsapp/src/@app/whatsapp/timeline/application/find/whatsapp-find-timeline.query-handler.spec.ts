import { WhatsappFindTimelineQuery, WhatsappITimelineRepository, WhatsappMockTimelineRepository, WhatsappTimelineMapper } from '@app/whatsapp/timeline';
import { WhatsappFindTimelineQueryHandler } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline.query-handler';
import { WhatsappFindTimelineService } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineQueryHandler', () =>
{
    let queryHandler: WhatsappFindTimelineQueryHandler;
    let service: WhatsappFindTimelineService;
    let repository: WhatsappMockTimelineRepository;
    let mapper: WhatsappTimelineMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappFindTimelineQueryHandler,
                {
                    provide : WhatsappITimelineRepository,
                    useClass: WhatsappMockTimelineRepository,
                },
                {
                    provide : WhatsappFindTimelineService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappFindTimelineQueryHandler>(WhatsappFindTimelineQueryHandler);
        service = module.get<WhatsappFindTimelineService>(WhatsappFindTimelineService);
        repository = <WhatsappMockTimelineRepository>module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository);
        mapper = new WhatsappTimelineMapper();
    });

    describe('main', () =>
    {
        test('WhatsappFindTimelineQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an timeline founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new WhatsappFindTimelineQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
