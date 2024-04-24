import { WhatsappITimelineRepository, WhatsappMockTimelineRepository, WhatsappSumTimelineQuery } from '@app/whatsapp/timeline';
import { WhatsappSumTimelineQueryHandler } from '@app/whatsapp/timeline/application/sum/whatsapp-sum-timeline.query-handler';
import { WhatsappSumTimelineService } from '@app/whatsapp/timeline/application/sum/whatsapp-sum-timeline.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappSumTimelineQueryHandler', () =>
{
    let queryHandler: WhatsappSumTimelineQueryHandler;
    let service: WhatsappSumTimelineService;
    let repository: WhatsappMockTimelineRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappSumTimelineQueryHandler,
                {
                    provide : WhatsappITimelineRepository,
                    useClass: WhatsappMockTimelineRepository,
                },
                {
                    provide : WhatsappSumTimelineService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<WhatsappSumTimelineQueryHandler>(WhatsappSumTimelineQueryHandler);
        service = module.get<WhatsappSumTimelineService>(WhatsappSumTimelineService);
        repository = <WhatsappMockTimelineRepository>module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappSumTimelineQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new WhatsappSumTimelineQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
