import { MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageMinOutboxService } from '@app/message/outbox/application/min/message-min-outbox.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinOutboxService', () =>
{
    let service: MessageMinOutboxService;
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
                MessageMinOutboxService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMinOutboxService);
        repository = module.get(MessageIOutboxRepository);
        mockRepository = module.get(MessageMockOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMinOutboxService should be defined', () =>
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
