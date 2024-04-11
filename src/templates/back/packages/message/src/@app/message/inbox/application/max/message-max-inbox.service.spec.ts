import { MessageIInboxRepository, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageMaxInboxService } from '@app/message/inbox/application/max/message-max-inbox.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxInboxService', () =>
{
    let service: MessageMaxInboxService;
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
                MessageMaxInboxService,
                MessageMockInboxRepository,
                {
                    provide : MessageIInboxRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMaxInboxService);
        repository = module.get(MessageIInboxRepository);
        mockRepository = module.get(MessageMockInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxInboxService should be defined', () =>
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
