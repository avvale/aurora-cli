import { MessageIInboxRepository, MessageInboxMapper, MessageMockInboxRepository, MessageRawSQLInboxesQuery } from '@app/message/inbox';
import { MessageRawSQLInboxesQueryHandler } from '@app/message/inbox/application/raw-sql/message-raw-sql-inboxes.query-handler';
import { MessageRawSQLInboxesService } from '@app/message/inbox/application/raw-sql/message-raw-sql-inboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLInboxesQueryHandler', () =>
{
    let queryHandler: MessageRawSQLInboxesQueryHandler;
    let service: MessageRawSQLInboxesService;
    let repository: MessageMockInboxRepository;
    let mapper: MessageInboxMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageRawSQLInboxesQueryHandler,
                {
                    provide : MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide : MessageRawSQLInboxesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageRawSQLInboxesQueryHandler>(MessageRawSQLInboxesQueryHandler);
        service = module.get<MessageRawSQLInboxesService>(MessageRawSQLInboxesService);
        repository = <MessageMockInboxRepository>module.get<MessageIInboxRepository>(MessageIInboxRepository);
        mapper = new MessageInboxMapper();
    });

    describe('main', () =>
    {
        test('MessageRawSQLInboxesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inboxes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new MessageRawSQLInboxesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
