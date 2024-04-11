import { MessageIInboxRepository, MessageMockInboxRepository, MessageSumInboxQuery } from '@app/message/inbox';
import { MessageSumInboxQueryHandler } from '@app/message/inbox/application/sum/message-sum-inbox.query-handler';
import { MessageSumInboxService } from '@app/message/inbox/application/sum/message-sum-inbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumInboxQueryHandler', () =>
{
    let queryHandler: MessageSumInboxQueryHandler;
    let service: MessageSumInboxService;
    let repository: MessageMockInboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageSumInboxQueryHandler,
                {
                    provide : MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide : MessageSumInboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageSumInboxQueryHandler>(MessageSumInboxQueryHandler);
        service = module.get<MessageSumInboxService>(MessageSumInboxService);
        repository = <MessageMockInboxRepository>module.get<MessageIInboxRepository>(MessageIInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageSumInboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new MessageSumInboxQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
