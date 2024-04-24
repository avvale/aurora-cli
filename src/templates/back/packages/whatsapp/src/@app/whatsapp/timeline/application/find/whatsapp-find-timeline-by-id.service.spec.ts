import { WhatsappITimelineRepository, whatsappMockTimelineData, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappFindTimelineByIdService } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline-by-id.service';
import { WhatsappTimelineId } from '@app/whatsapp/timeline/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineByIdService', () =>
{
    let service: WhatsappFindTimelineByIdService;
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
                WhatsappFindTimelineByIdService,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappFindTimelineByIdService);
        repository = module.get(WhatsappITimelineRepository);
        mockRepository = module.get(WhatsappMockTimelineRepository);
    });

    describe('main', () =>
    {
        test('FindTimelineByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find timeline by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new WhatsappTimelineId(whatsappMockTimelineData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
