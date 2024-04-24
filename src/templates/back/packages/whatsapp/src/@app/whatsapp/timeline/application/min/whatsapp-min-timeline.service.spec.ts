import { WhatsappITimelineRepository, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappMinTimelineService } from '@app/whatsapp/timeline/application/min/whatsapp-min-timeline.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMinTimelineService', () =>
{
    let service: WhatsappMinTimelineService;
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
                WhatsappMinTimelineService,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappMinTimelineService);
        repository = module.get(WhatsappITimelineRepository);
        mockRepository = module.get(WhatsappMockTimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappMinTimelineService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
