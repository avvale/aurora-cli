import {
    MessageFindOutboxByIdQuery,
    MessageIOutboxRepository,
    messageMockOutboxData,
    MessageMockOutboxRepository,
    MessageOutboxMapper,
} from '@app/message/outbox';
import { MessageFindOutboxByIdQueryHandler } from '@app/message/outbox/application/find/message-find-outbox-by-id.query-handler';
import { MessageFindOutboxByIdService } from '@app/message/outbox/application/find/message-find-outbox-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxByIdQueryHandler', () => {
    let queryHandler: MessageFindOutboxByIdQueryHandler;
    let service: MessageFindOutboxByIdService;
    let repository: MessageMockOutboxRepository;
    let mapper: MessageOutboxMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageFindOutboxByIdQueryHandler,
                {
                    provide: MessageIOutboxRepository,
                    useClass: MessageMockOutboxRepository,
                },
                {
                    provide: MessageFindOutboxByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<MessageFindOutboxByIdQueryHandler>(
            MessageFindOutboxByIdQueryHandler,
        );
        service = module.get<MessageFindOutboxByIdService>(
            MessageFindOutboxByIdService,
        );
        repository = <MessageMockOutboxRepository>(
            module.get<MessageIOutboxRepository>(MessageIOutboxRepository)
        );
        mapper = new MessageOutboxMapper();
    });

    describe('main', () => {
        test('FindOutboxByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an outbox founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new MessageFindOutboxByIdQuery(messageMockOutboxData[0].id),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
