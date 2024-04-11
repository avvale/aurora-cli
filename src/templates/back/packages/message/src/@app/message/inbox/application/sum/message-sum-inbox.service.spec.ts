import { MessageIInboxRepository, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageSumInboxService } from '@app/message/inbox/application/sum/message-sum-inbox.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumInboxService', () =>
{
    let service: MessageSumInboxService;
    let repository: MessageIInboxRepository;
    let mockRepository: MessageMockInboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageSumInboxService,
                MessageMockInboxRepository,
                {
                    provide : MessageIInboxRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageSumInboxService);
        repository = module.get(MessageIInboxRepository);
        mockRepository = module.get(MessageMockInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageSumInboxService should be defined', () =>
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
