import { MessageIInboxRepository, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageMinInboxService } from '@app/message/inbox/application/min/message-min-inbox.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinInboxService', () =>
{
    let service: MessageMinInboxService;
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
                MessageMinInboxService,
                MessageMockInboxRepository,
                {
                    provide : MessageIInboxRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMinInboxService);
        repository = module.get(MessageIInboxRepository);
        mockRepository = module.get(MessageMockInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMinInboxService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
