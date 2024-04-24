/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappITimelineRepository, WhatsappMockTimelineRepository } from '@app/whatsapp/timeline';
import { WhatsappDeleteTimelinesService } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timelines.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelinesService', () =>
{
    let service: WhatsappDeleteTimelinesService;
    let repository: WhatsappITimelineRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappDeleteTimelinesService,
                WhatsappMockTimelineRepository,
                {
                    provide : WhatsappITimelineRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappDeleteTimelinesService);
        repository = module.get(WhatsappITimelineRepository);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteTimelinesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete timeline and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
