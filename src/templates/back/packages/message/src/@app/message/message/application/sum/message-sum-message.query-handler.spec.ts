import { MessageIMessageRepository, MessageMockMessageRepository, MessageSumMessageQuery } from '@app/message/message';
import { MessageSumMessageQueryHandler } from '@app/message/message/application/sum/message-sum-message.query-handler';
import { MessageSumMessageService } from '@app/message/message/application/sum/message-sum-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumMessageQueryHandler', () =>
{
    let queryHandler: MessageSumMessageQueryHandler;
    let service: MessageSumMessageService;
    let repository: MessageMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageSumMessageQueryHandler,
                {
                    provide : MessageIMessageRepository,
                    useClass: MessageMockMessageRepository,
                },
                {
                    provide : MessageSumMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageSumMessageQueryHandler>(MessageSumMessageQueryHandler);
        service = module.get<MessageSumMessageService>(MessageSumMessageService);
        repository = <MessageMockMessageRepository>module.get<MessageIMessageRepository>(MessageIMessageRepository);
    });

    describe('main', () =>
    {
        test('MessageSumMessageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new MessageSumMessageQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
