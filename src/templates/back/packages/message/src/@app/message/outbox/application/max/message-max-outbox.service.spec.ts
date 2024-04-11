import { MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageMaxOutboxService } from '@app/message/outbox/application/max/message-max-outbox.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxOutboxService', () =>
{
    let service: MessageMaxOutboxService;
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
                MessageMaxOutboxService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMaxOutboxService);
        repository = module.get(MessageIOutboxRepository);
        mockRepository = module.get(MessageMockOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxOutboxService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
