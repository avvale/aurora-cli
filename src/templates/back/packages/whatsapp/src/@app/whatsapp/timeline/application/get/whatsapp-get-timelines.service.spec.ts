import { WhatsappITimelineRepository, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappGetTimelinesService } from '@app/whatsapp/timeline/application/get/whatsapp-get-timelines.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetTimelinesService', () =>
{
    let service: WhatsappGetTimelinesService;
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
                WhatsappGetTimelinesService,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappGetTimelinesService);
        repository = module.get(WhatsappITimelineRepository);
        mockRepository = module.get(WhatsappMockTimelineRepository);
    });

    describe('main', () =>
    {
        test('GetTimelinesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get timelines', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
