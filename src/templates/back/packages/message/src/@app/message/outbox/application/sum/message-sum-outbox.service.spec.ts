import { MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageSumOutboxService } from '@app/message/outbox/application/sum/message-sum-outbox.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumOutboxService', () =>
{
    let service: MessageSumOutboxService;
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
                MessageSumOutboxService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageSumOutboxService);
        repository = module.get(MessageIOutboxRepository);
        mockRepository = module.get(MessageMockOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageSumOutboxService should be defined', () =>
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
