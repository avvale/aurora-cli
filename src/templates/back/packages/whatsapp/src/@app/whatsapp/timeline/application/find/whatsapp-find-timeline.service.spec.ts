import { WhatsappITimelineRepository, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappFindTimelineService } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineService', () =>
{
    let service: WhatsappFindTimelineService;
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
                WhatsappFindTimelineService,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappFindTimelineService);
        repository = module.get(WhatsappITimelineRepository);
        mockRepository = module.get(WhatsappMockTimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappFindTimelineService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find timeline', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
