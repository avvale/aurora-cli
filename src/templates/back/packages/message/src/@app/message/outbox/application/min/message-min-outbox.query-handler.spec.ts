import { MessageIOutboxRepository, MessageMinOutboxQuery, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageMinOutboxQueryHandler } from '@app/message/outbox/application/min/message-min-outbox.query-handler';
import { MessageMinOutboxService } from '@app/message/outbox/application/min/message-min-outbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinOutboxQueryHandler', () =>
{
    let queryHandler: MessageMinOutboxQueryHandler;
    let service: MessageMinOutboxService;
    let repository: MessageMockOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMinOutboxQueryHandler,
                {
                    provide : MessageIOutboxRepository,
                    useClass: MessageMockOutboxRepository,
                },
                {
                    provide : MessageMinOutboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMinOutboxQueryHandler>(MessageMinOutboxQueryHandler);
        service = module.get<MessageMinOutboxService>(MessageMinOutboxService);
        repository = <MessageMockOutboxRepository>module.get<MessageIOutboxRepository>(MessageIOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageMinOutboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new MessageMinOutboxQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
