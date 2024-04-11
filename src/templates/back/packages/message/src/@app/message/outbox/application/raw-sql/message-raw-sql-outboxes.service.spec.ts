import { MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageRawSQLOutboxesService } from '@app/message/outbox/application/raw-sql/message-raw-sql-outboxes.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageRawSQLOutboxesService ', () =>
{
    let service: MessageRawSQLOutboxesService ;
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
                MessageRawSQLOutboxesService ,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(MessageRawSQLOutboxesService );
        repository      = module.get(MessageIOutboxRepository);
        mockRepository  = module.get(MessageMockOutboxRepository);
    });

    describe('main', () =>
    {
        test('RawSQLOutboxesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get outboxes', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
