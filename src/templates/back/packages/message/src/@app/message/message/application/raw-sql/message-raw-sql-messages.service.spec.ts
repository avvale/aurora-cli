import { MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessageRawSQLMessagesService } from '@app/message/message/application/raw-sql/message-raw-sql-messages.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageRawSQLMessagesService ', () =>
{
    let service: MessageRawSQLMessagesService ;
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
                MessageRawSQLMessagesService ,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(MessageRawSQLMessagesService );
        repository      = module.get(MessageIMessageRepository);
        mockRepository  = module.get(MessageMockMessageRepository);
    });

    describe('main', () =>
    {
        test('RawSQLMessagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get messages', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
