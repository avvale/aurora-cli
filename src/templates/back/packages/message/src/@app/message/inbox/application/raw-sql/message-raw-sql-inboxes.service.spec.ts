import { MessageIInboxRepository, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageRawSQLInboxesService } from '@app/message/inbox/application/raw-sql/message-raw-sql-inboxes.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageRawSQLInboxesService ', () =>
{
    let service: MessageRawSQLInboxesService ;
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
                MessageRawSQLInboxesService ,
                MessageMockInboxRepository,
                {
                    provide : MessageIInboxRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(MessageRawSQLInboxesService );
        repository      = module.get(MessageIInboxRepository);
        mockRepository  = module.get(MessageMockInboxRepository);
    });

    describe('main', () =>
    {
        test('RawSQLInboxesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get inboxes', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
