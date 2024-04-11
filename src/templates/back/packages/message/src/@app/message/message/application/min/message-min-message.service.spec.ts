import { MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessageMinMessageService } from '@app/message/message/application/min/message-min-message.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinMessageService', () =>
{
    let service: MessageMinMessageService;
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
                MessageMinMessageService,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageMinMessageService);
        repository = module.get(MessageIMessageRepository);
        mockRepository = module.get(MessageMockMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageMinMessageService should be defined', () =>
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
