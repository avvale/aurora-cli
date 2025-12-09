import {
    MessageFindMessageQuery,
    MessageIMessageRepository,
    MessageMessageMapper,
    MessageMockMessageRepository,
} from '@app/message/message';
import { MessageFindMessageQueryHandler } from '@app/message/message/application/find/message-find-message.query-handler';
import { MessageFindMessageService } from '@app/message/message/application/find/message-find-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageQueryHandler', () => {
    let queryHandler: MessageFindMessageQueryHandler;
    let service: MessageFindMessageService;
    let repository: MessageMockMessageRepository;
    let mapper: MessageMessageMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageFindMessageQueryHandler,
                {
                    provide: MessageIMessageRepository,
                    useClass: MessageMockMessageRepository,
                },
                {
                    provide: MessageFindMessageService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<MessageFindMessageQueryHandler>(
            MessageFindMessageQueryHandler,
        );
        service = module.get<MessageFindMessageService>(
            MessageFindMessageService,
        );
        repository = <MessageMockMessageRepository>(
            module.get<MessageIMessageRepository>(MessageIMessageRepository)
        );
        mapper = new MessageMessageMapper();
    });

    describe('main', () => {
        test('MessageFindMessageQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an message founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new MessageFindMessageQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
