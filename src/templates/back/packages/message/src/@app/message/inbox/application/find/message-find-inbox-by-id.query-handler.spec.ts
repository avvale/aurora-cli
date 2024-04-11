import { MessageFindInboxByIdQuery, MessageIInboxRepository, MessageInboxMapper, messageMockInboxData, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageFindInboxByIdQueryHandler } from '@app/message/inbox/application/find/message-find-inbox-by-id.query-handler';
import { MessageFindInboxByIdService } from '@app/message/inbox/application/find/message-find-inbox-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxByIdQueryHandler', () =>
{
    let queryHandler: MessageFindInboxByIdQueryHandler;
    let service: MessageFindInboxByIdService;
    let repository: MessageMockInboxRepository;
    let mapper: MessageInboxMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageFindInboxByIdQueryHandler,
                {
                    provide : MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide : MessageFindInboxByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageFindInboxByIdQueryHandler>(MessageFindInboxByIdQueryHandler);
        service = module.get<MessageFindInboxByIdService>(MessageFindInboxByIdService);
        repository = <MessageMockInboxRepository>module.get<MessageIInboxRepository>(MessageIInboxRepository);
        mapper = new MessageInboxMapper();
    });

    describe('main', () =>
    {
        test('FindInboxByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inbox founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new MessageFindInboxByIdQuery(
                    messageMockInboxData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
