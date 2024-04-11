import { MessageGetMessagesQuery, MessageIMessageRepository, MessageMessageMapper, MessageMockMessageRepository } from '@app/message/message';
import { MessageGetMessagesQueryHandler } from '@app/message/message/application/get/message-get-messages.query-handler';
import { MessageGetMessagesService } from '@app/message/message/application/get/message-get-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetMessagesQueryHandler', () =>
{
    let queryHandler: MessageGetMessagesQueryHandler;
    let service: MessageGetMessagesService;
    let repository: MessageMockMessageRepository;
    let mapper: MessageMessageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageGetMessagesQueryHandler,
                {
                    provide : MessageIMessageRepository,
                    useClass: MessageMockMessageRepository,
                },
                {
                    provide : MessageGetMessagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageGetMessagesQueryHandler>(MessageGetMessagesQueryHandler);
        service = module.get<MessageGetMessagesService>(MessageGetMessagesService);
        repository = <MessageMockMessageRepository>module.get<MessageIMessageRepository>(MessageIMessageRepository);
        mapper = new MessageMessageMapper();
    });

    describe('main', () =>
    {
        test('MessageGetMessagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messages founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new MessageGetMessagesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
