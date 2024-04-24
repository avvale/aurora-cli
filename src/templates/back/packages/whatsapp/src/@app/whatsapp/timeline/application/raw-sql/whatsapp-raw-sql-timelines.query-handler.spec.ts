import { WhatsappITimelineRepository, WhatsappMockTimelineRepository, WhatsappRawSQLTimelinesQuery, WhatsappTimelineMapper } from '@app/whatsapp/timeline';
import { WhatsappRawSQLTimelinesQueryHandler } from '@app/whatsapp/timeline/application/raw-sql/whatsapp-raw-sql-timelines.query-handler';
import { WhatsappRawSQLTimelinesService } from '@app/whatsapp/timeline/application/raw-sql/whatsapp-raw-sql-timelines.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLTimelinesQueryHandler', () =>
{
    let queryHandler: WhatsappRawSQLTimelinesQueryHandler;
    let service: WhatsappRawSQLTimelinesService;
    let repository: WhatsappMockTimelineRepository;
    let mapper: WhatsappTimelineMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappRawSQLTimelinesQueryHandler,
                {
                    provide : WhatsappITimelineRepository,
                    useClass: WhatsappMockTimelineRepository,
                },
                {
                    provide : WhatsappRawSQLTimelinesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappRawSQLTimelinesQueryHandler>(WhatsappRawSQLTimelinesQueryHandler);
        service = module.get<WhatsappRawSQLTimelinesService>(WhatsappRawSQLTimelinesService);
        repository = <WhatsappMockTimelineRepository>module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository);
        mapper = new WhatsappTimelineMapper();
    });

    describe('main', () =>
    {
        test('WhatsappRawSQLTimelinesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an timelines founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new WhatsappRawSQLTimelinesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
