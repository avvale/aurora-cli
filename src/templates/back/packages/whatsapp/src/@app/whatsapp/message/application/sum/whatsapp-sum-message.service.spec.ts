import { WhatsappIMessageRepository, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappSumMessageService } from '@app/whatsapp/message/application/sum/whatsapp-sum-message.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappSumMessageService', () =>
{
    let service: WhatsappSumMessageService;
    let repository: WhatsappIMessageRepository;
    let mockRepository: WhatsappMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappSumMessageService,
                WhatsappMockMessageRepository,
                {
                    provide : WhatsappIMessageRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappSumMessageService);
        repository = module.get(WhatsappIMessageRepository);
        mockRepository = module.get(WhatsappMockMessageRepository);
    });

    describe('main', () =>
    {
        test('WhatsappSumMessageService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});
