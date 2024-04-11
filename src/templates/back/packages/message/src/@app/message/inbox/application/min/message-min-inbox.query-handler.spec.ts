import { MessageIInboxRepository, MessageMinInboxQuery, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageMinInboxQueryHandler } from '@app/message/inbox/application/min/message-min-inbox.query-handler';
import { MessageMinInboxService } from '@app/message/inbox/application/min/message-min-inbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinInboxQueryHandler', () =>
{
    let queryHandler: MessageMinInboxQueryHandler;
    let service: MessageMinInboxService;
    let repository: MessageMockInboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMinInboxQueryHandler,
                {
                    provide : MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide : MessageMinInboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMinInboxQueryHandler>(MessageMinInboxQueryHandler);
        service = module.get<MessageMinInboxService>(MessageMinInboxService);
        repository = <MessageMockInboxRepository>module.get<MessageIInboxRepository>(MessageIInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMinInboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new MessageMinInboxQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
