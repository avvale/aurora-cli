import { MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessageCountMessageService } from '@app/message/message/application/count/message-count-message.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountMessageService', () =>
{
    let service: MessageCountMessageService;
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
                MessageCountMessageService,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageCountMessageService);
        repository = module.get(MessageIMessageRepository);
        mockRepository = module.get(MessageMockMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageCountMessageService should be defined', () =>
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
