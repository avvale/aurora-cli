import { MessageIOutboxRepository, MessageMockOutboxRepository, MessageSumOutboxQuery } from '@app/message/outbox';
import { MessageSumOutboxQueryHandler } from '@app/message/outbox/application/sum/message-sum-outbox.query-handler';
import { MessageSumOutboxService } from '@app/message/outbox/application/sum/message-sum-outbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumOutboxQueryHandler', () =>
{
    let queryHandler: MessageSumOutboxQueryHandler;
    let service: MessageSumOutboxService;
    let repository: MessageMockOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageSumOutboxQueryHandler,
                {
                    provide : MessageIOutboxRepository,
                    useClass: MessageMockOutboxRepository,
                },
                {
                    provide : MessageSumOutboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageSumOutboxQueryHandler>(MessageSumOutboxQueryHandler);
        service = module.get<MessageSumOutboxService>(MessageSumOutboxService);
        repository = <MessageMockOutboxRepository>module.get<MessageIOutboxRepository>(MessageIOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageSumOutboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new MessageSumOutboxQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
