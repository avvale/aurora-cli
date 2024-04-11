import { MessageIInboxRepository, MessageMaxInboxQuery, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageMaxInboxQueryHandler } from '@app/message/inbox/application/max/message-max-inbox.query-handler';
import { MessageMaxInboxService } from '@app/message/inbox/application/max/message-max-inbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxInboxQueryHandler', () =>
{
    let queryHandler: MessageMaxInboxQueryHandler;
    let service: MessageMaxInboxService;
    let repository: MessageMockInboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMaxInboxQueryHandler,
                {
                    provide : MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide : MessageMaxInboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMaxInboxQueryHandler>(MessageMaxInboxQueryHandler);
        service = module.get<MessageMaxInboxService>(MessageMaxInboxService);
        repository = <MessageMockInboxRepository>module.get<MessageIInboxRepository>(MessageIInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxInboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new MessageMaxInboxQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
