import { WhatsappIMessageRepository, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappGetMessagesService } from '@app/whatsapp/message/application/get/whatsapp-get-messages.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetMessagesService', () =>
{
    let service: WhatsappGetMessagesService;
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
                WhatsappGetMessagesService,
                WhatsappMockMessageRepository,
                {
                    provide : WhatsappIMessageRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappGetMessagesService);
        repository = module.get(WhatsappIMessageRepository);
        mockRepository = module.get(WhatsappMockMessageRepository);
    });

    describe('main', () =>
    {
        test('GetMessagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get messages', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
