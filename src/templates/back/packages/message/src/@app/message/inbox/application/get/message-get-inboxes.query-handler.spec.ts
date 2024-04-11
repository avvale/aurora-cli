import { MessageGetInboxesQuery, MessageIInboxRepository, MessageInboxMapper, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageGetInboxesQueryHandler } from '@app/message/inbox/application/get/message-get-inboxes.query-handler';
import { MessageGetInboxesService } from '@app/message/inbox/application/get/message-get-inboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetInboxesQueryHandler', () =>
{
    let queryHandler: MessageGetInboxesQueryHandler;
    let service: MessageGetInboxesService;
    let repository: MessageMockInboxRepository;
    let mapper: MessageInboxMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageGetInboxesQueryHandler,
                {
                    provide : MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide : MessageGetInboxesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageGetInboxesQueryHandler>(MessageGetInboxesQueryHandler);
        service = module.get<MessageGetInboxesService>(MessageGetInboxesService);
        repository = <MessageMockInboxRepository>module.get<MessageIInboxRepository>(MessageIInboxRepository);
        mapper = new MessageInboxMapper();
    });

    describe('main', () =>
    {
        test('MessageGetInboxesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inboxes founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new MessageGetInboxesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
