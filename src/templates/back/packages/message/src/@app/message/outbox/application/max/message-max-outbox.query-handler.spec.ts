import { MessageIOutboxRepository, MessageMaxOutboxQuery, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageMaxOutboxQueryHandler } from '@app/message/outbox/application/max/message-max-outbox.query-handler';
import { MessageMaxOutboxService } from '@app/message/outbox/application/max/message-max-outbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxOutboxQueryHandler', () =>
{
    let queryHandler: MessageMaxOutboxQueryHandler;
    let service: MessageMaxOutboxService;
    let repository: MessageMockOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMaxOutboxQueryHandler,
                {
                    provide : MessageIOutboxRepository,
                    useClass: MessageMockOutboxRepository,
                },
                {
                    provide : MessageMaxOutboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMaxOutboxQueryHandler>(MessageMaxOutboxQueryHandler);
        service = module.get<MessageMaxOutboxService>(MessageMaxOutboxService);
        repository = <MessageMockOutboxRepository>module.get<MessageIOutboxRepository>(MessageIOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxOutboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new MessageMaxOutboxQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
