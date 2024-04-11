import { MessageIMessageRepository, MessageMinMessageQuery, MessageMockMessageRepository } from '@app/message/message';
import { MessageMinMessageQueryHandler } from '@app/message/message/application/min/message-min-message.query-handler';
import { MessageMinMessageService } from '@app/message/message/application/min/message-min-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinMessageQueryHandler', () =>
{
    let queryHandler: MessageMinMessageQueryHandler;
    let service: MessageMinMessageService;
    let repository: MessageMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMinMessageQueryHandler,
                {
                    provide : MessageIMessageRepository,
                    useClass: MessageMockMessageRepository,
                },
                {
                    provide : MessageMinMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMinMessageQueryHandler>(MessageMinMessageQueryHandler);
        service = module.get<MessageMinMessageService>(MessageMinMessageService);
        repository = <MessageMockMessageRepository>module.get<MessageIMessageRepository>(MessageIMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageMinMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new MessageMinMessageQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
