/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappITimelineRepository, whatsappMockTimelineData, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappDeleteTimelineByIdService } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timeline-by-id.service';
import { WhatsappTimelineId } from '@app/whatsapp/timeline/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelineByIdService', () =>
{
    let service: WhatsappDeleteTimelineByIdService;
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
                WhatsappDeleteTimelineByIdService,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappDeleteTimelineByIdService);
        repository = module.get(WhatsappITimelineRepository);
        mockRepository = module.get(WhatsappMockTimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteTimelineByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete timeline and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new WhatsappTimelineId(whatsappMockTimelineData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
