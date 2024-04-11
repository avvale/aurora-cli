import { MessageIMessageRepository, MessageMessageMapper, MessageMockMessageRepository, MessageRawSQLMessagesQuery } from '@app/message/message';
import { MessageRawSQLMessagesQueryHandler } from '@app/message/message/application/raw-sql/message-raw-sql-messages.query-handler';
import { MessageRawSQLMessagesService } from '@app/message/message/application/raw-sql/message-raw-sql-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLMessagesQueryHandler', () =>
{
    let queryHandler: MessageRawSQLMessagesQueryHandler;
    let service: MessageRawSQLMessagesService;
    let repository: MessageMockMessageRepository;
    let mapper: MessageMessageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageRawSQLMessagesQueryHandler,
                {
                    provide : MessageIMessageRepository,
                    useClass: MessageMockMessageRepository,
                },
                {
                    provide : MessageRawSQLMessagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageRawSQLMessagesQueryHandler>(MessageRawSQLMessagesQueryHandler);
        service = module.get<MessageRawSQLMessagesService>(MessageRawSQLMessagesService);
        repository = <MessageMockMessageRepository>module.get<MessageIMessageRepository>(MessageIMessageRepository);
        mapper = new MessageMessageMapper();
    });

    describe('main', () =>
    {
        test('MessageRawSQLMessagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messages founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new MessageRawSQLMessagesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
