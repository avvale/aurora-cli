import {
    MessageFindInboxQuery,
    MessageIInboxRepository,
    MessageInboxMapper,
    MessageMockInboxRepository,
} from '@app/message/inbox';
import { MessageFindInboxQueryHandler } from '@app/message/inbox/application/find/message-find-inbox.query-handler';
import { MessageFindInboxService } from '@app/message/inbox/application/find/message-find-inbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxQueryHandler', () => {
    let queryHandler: MessageFindInboxQueryHandler;
    let service: MessageFindInboxService;
    let repository: MessageMockInboxRepository;
    let mapper: MessageInboxMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageFindInboxQueryHandler,
                {
                    provide: MessageIInboxRepository,
                    useClass: MessageMockInboxRepository,
                },
                {
                    provide: MessageFindInboxService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<MessageFindInboxQueryHandler>(
            MessageFindInboxQueryHandler,
        );
        service = module.get<MessageFindInboxService>(MessageFindInboxService);
        repository = <MessageMockInboxRepository>(
            module.get<MessageIInboxRepository>(MessageIInboxRepository)
        );
        mapper = new MessageInboxMapper();
    });

    describe('main', () => {
        test('MessageFindInboxQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inbox founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new MessageFindInboxQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
