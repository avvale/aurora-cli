import { WhatsappITimelineRepository, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappRawSQLTimelinesService } from '@app/whatsapp/timeline/application/raw-sql/whatsapp-raw-sql-timelines.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappRawSQLTimelinesService ', () =>
{
    let service: WhatsappRawSQLTimelinesService ;
    let repository: WhatsappITimelineRepository;
    let mockRepository: WhatsappMockTimelineRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappRawSQLTimelinesService ,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(WhatsappRawSQLTimelinesService );
        repository      = module.get(WhatsappITimelineRepository);
        mockRepository  = module.get(WhatsappMockTimelineRepository);
    });

    describe('main', () =>
    {
        test('RawSQLTimelinesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get timelines', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
