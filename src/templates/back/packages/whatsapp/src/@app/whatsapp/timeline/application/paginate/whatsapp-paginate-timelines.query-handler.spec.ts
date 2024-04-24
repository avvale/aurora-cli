import { WhatsappITimelineRepository, WhatsappMockTimelineRepository, WhatsappPaginateTimelinesQuery } from '@app/whatsapp/timeline';
import { WhatsappPaginateTimelinesQueryHandler } from '@app/whatsapp/timeline/application/paginate/whatsapp-paginate-timelines.query-handler';
import { WhatsappPaginateTimelinesService } from '@app/whatsapp/timeline/application/paginate/whatsapp-paginate-timelines.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateTimelinesQueryHandler', () =>
{
    let queryHandler: WhatsappPaginateTimelinesQueryHandler;
    let service: WhatsappPaginateTimelinesService;
    let repository: WhatsappMockTimelineRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappPaginateTimelinesQueryHandler,
                {
                    provide : WhatsappITimelineRepository,
                    useClass: WhatsappMockTimelineRepository,
                },
                {
                    provide : WhatsappPaginateTimelinesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappPaginateTimelinesQueryHandler>(WhatsappPaginateTimelinesQueryHandler);
        service = module.get<WhatsappPaginateTimelinesService>(WhatsappPaginateTimelinesService);
        repository = <WhatsappMockTimelineRepository>module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappPaginateTimelinesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an timelines paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new WhatsappPaginateTimelinesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
