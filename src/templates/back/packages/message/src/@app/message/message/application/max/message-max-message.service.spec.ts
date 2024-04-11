import { MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessageMaxMessageService } from '@app/message/message/application/max/message-max-message.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxMessageService', () =>
{
    let service: MessageMaxMessageService;
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
                MessageMaxMessageService,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMaxMessageService);
        repository = module.get(MessageIMessageRepository);
        mockRepository = module.get(MessageMockMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxMessageService should be defined', () =>
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
