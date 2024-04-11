import { MessageCountInboxQuery, MessageIInboxRepository, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageCountInboxQueryHandler } from '@app/message/inbox/application/count/message-count-inbox.query-handler';
import { MessageCountInboxService } from '@app/message/inbox/application/count/message-count-inbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountInboxQueryHandler', () =>
{
    let queryHandler: MessageCountInboxQueryHandler;
    let service: MessageCountInboxService;
    let repository: MessageMockInboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCountInboxQueryHandler,
                {
                    provide : MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide : MessageCountInboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageCountInboxQueryHandler>(MessageCountInboxQueryHandler);
        service = module.get<MessageCountInboxService>(MessageCountInboxService);
        repository = <MessageMockInboxRepository>module.get<MessageIInboxRepository>(MessageIInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageCountInboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new MessageCountInboxQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
