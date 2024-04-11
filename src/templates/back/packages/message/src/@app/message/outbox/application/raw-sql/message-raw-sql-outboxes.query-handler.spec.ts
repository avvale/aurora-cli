import { MessageIOutboxRepository, MessageMockOutboxRepository, MessageOutboxMapper, MessageRawSQLOutboxesQuery } from '@app/message/outbox';
import { MessageRawSQLOutboxesQueryHandler } from '@app/message/outbox/application/raw-sql/message-raw-sql-outboxes.query-handler';
import { MessageRawSQLOutboxesService } from '@app/message/outbox/application/raw-sql/message-raw-sql-outboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLOutboxesQueryHandler', () =>
{
    let queryHandler: MessageRawSQLOutboxesQueryHandler;
    let service: MessageRawSQLOutboxesService;
    let repository: MessageMockOutboxRepository;
    let mapper: MessageOutboxMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageRawSQLOutboxesQueryHandler,
                {
                    provide : MessageIOutboxRepository,
                    useClass: MessageMockOutboxRepository,
                },
                {
                    provide : MessageRawSQLOutboxesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageRawSQLOutboxesQueryHandler>(MessageRawSQLOutboxesQueryHandler);
        service = module.get<MessageRawSQLOutboxesService>(MessageRawSQLOutboxesService);
        repository = <MessageMockOutboxRepository>module.get<MessageIOutboxRepository>(MessageIOutboxRepository);
        mapper = new MessageOutboxMapper();
    });

    describe('main', () =>
    {
        test('MessageRawSQLOutboxesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an outboxes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new MessageRawSQLOutboxesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
