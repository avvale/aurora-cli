import { MessageCountOutboxQuery, MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageCountOutboxQueryHandler } from '@app/message/outbox/application/count/message-count-outbox.query-handler';
import { MessageCountOutboxService } from '@app/message/outbox/application/count/message-count-outbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountOutboxQueryHandler', () =>
{
    let queryHandler: MessageCountOutboxQueryHandler;
    let service: MessageCountOutboxService;
    let repository: MessageMockOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCountOutboxQueryHandler,
                {
                    provide : MessageIOutboxRepository,
                    useClass: MessageMockOutboxRepository,
                },
                {
                    provide : MessageCountOutboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageCountOutboxQueryHandler>(MessageCountOutboxQueryHandler);
        service = module.get<MessageCountOutboxService>(MessageCountOutboxService);
        repository = <MessageMockOutboxRepository>module.get<MessageIOutboxRepository>(MessageIOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageCountOutboxQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new MessageCountOutboxQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
