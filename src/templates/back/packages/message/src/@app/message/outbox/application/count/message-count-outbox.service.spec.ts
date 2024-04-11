import { MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageCountOutboxService } from '@app/message/outbox/application/count/message-count-outbox.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountOutboxService', () =>
{
    let service: MessageCountOutboxService;
    let repository: MessageIOutboxRepository;
    let mockRepository: MessageMockOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCountOutboxService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageCountOutboxService);
        repository = module.get(MessageIOutboxRepository);
        mockRepository = module.get(MessageMockOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageCountOutboxService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
