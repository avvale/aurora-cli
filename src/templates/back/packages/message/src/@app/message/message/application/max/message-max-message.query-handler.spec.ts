import { MessageIMessageRepository, MessageMaxMessageQuery, MessageMockMessageRepository } from '@app/message/message';
import { MessageMaxMessageQueryHandler } from '@app/message/message/application/max/message-max-message.query-handler';
import { MessageMaxMessageService } from '@app/message/message/application/max/message-max-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxMessageQueryHandler', () =>
{
    let queryHandler: MessageMaxMessageQueryHandler;
    let service: MessageMaxMessageService;
    let repository: MessageMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMaxMessageQueryHandler,
                {
                    provide : MessageIMessageRepository,
                    useClass: MessageMockMessageRepository,
                },
                {
                    provide : MessageMaxMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMaxMessageQueryHandler>(MessageMaxMessageQueryHandler);
        service = module.get<MessageMaxMessageService>(MessageMaxMessageService);
        repository = <MessageMockMessageRepository>module.get<MessageIMessageRepository>(MessageIMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new MessageMaxMessageQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
