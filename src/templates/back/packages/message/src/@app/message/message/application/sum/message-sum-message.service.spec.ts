import { MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessageSumMessageService } from '@app/message/message/application/sum/message-sum-message.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumMessageService', () =>
{
    let service: MessageSumMessageService;
    let repository: MessageIMessageRepository;
    let mockRepository: MessageMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageSumMessageService,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageSumMessageService);
        repository = module.get(MessageIMessageRepository);
        mockRepository = module.get(MessageMockMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageSumMessageService should be defined', () =>
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
