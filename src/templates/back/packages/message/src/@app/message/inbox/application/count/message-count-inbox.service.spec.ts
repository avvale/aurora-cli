import {
    MessageIInboxRepository,
    MessageMockInboxRepository,
} from '@app/message/inbox';
import { MessageCountInboxService } from '@app/message/inbox/application/count/message-count-inbox.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountInboxService', () => {
    let service: MessageCountInboxService;
    let repository: MessageIInboxRepository;
    let mockRepository: MessageMockInboxRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCountInboxService,
                MessageMockInboxRepository,
                {
                    provide: MessageIInboxRepository,
                    useValue: {
                        count: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(MessageCountInboxService);
        repository = module.get(MessageIInboxRepository);
        mockRepository = module.get(MessageMockInboxRepository);
    });

    describe('main', () => {
        test('MessageCountInboxService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () => {
            jest.spyOn(repository, 'count').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource.length),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource.length,
            );
        });
    });
});
