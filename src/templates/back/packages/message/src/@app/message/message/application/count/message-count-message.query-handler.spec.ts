import { MessageCountMessageQuery, MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessageCountMessageQueryHandler } from '@app/message/message/application/count/message-count-message.query-handler';
import { MessageCountMessageService } from '@app/message/message/application/count/message-count-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountMessageQueryHandler', () =>
{
    let queryHandler: MessageCountMessageQueryHandler;
    let service: MessageCountMessageService;
    let repository: MessageMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCountMessageQueryHandler,
                {
                    provide : MessageIMessageRepository,
                    useClass: MessageMockMessageRepository,
                },
                {
                    provide : MessageCountMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageCountMessageQueryHandler>(MessageCountMessageQueryHandler);
        service = module.get<MessageCountMessageService>(MessageCountMessageService);
        repository = <MessageMockMessageRepository>module.get<MessageIMessageRepository>(MessageIMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageCountMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new MessageCountMessageQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
