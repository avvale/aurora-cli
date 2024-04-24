import { WhatsappGetTimelinesQuery, WhatsappITimelineRepository, WhatsappMockTimelineRepository, WhatsappTimelineMapper } from '@app/whatsapp/timeline';
import { WhatsappGetTimelinesQueryHandler } from '@app/whatsapp/timeline/application/get/whatsapp-get-timelines.query-handler';
import { WhatsappGetTimelinesService } from '@app/whatsapp/timeline/application/get/whatsapp-get-timelines.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetTimelinesQueryHandler', () =>
{
    let queryHandler: WhatsappGetTimelinesQueryHandler;
    let service: WhatsappGetTimelinesService;
    let repository: WhatsappMockTimelineRepository;
    let mapper: WhatsappTimelineMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappGetTimelinesQueryHandler,
                {
                    provide : WhatsappITimelineRepository,
                    useClass: WhatsappMockTimelineRepository,
                },
                {
                    provide : WhatsappGetTimelinesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappGetTimelinesQueryHandler>(WhatsappGetTimelinesQueryHandler);
        service = module.get<WhatsappGetTimelinesService>(WhatsappGetTimelinesService);
        repository = <WhatsappMockTimelineRepository>module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository);
        mapper = new WhatsappTimelineMapper();
    });

    describe('main', () =>
    {
        test('WhatsappGetTimelinesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an timelines founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new WhatsappGetTimelinesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
