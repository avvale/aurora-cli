import {
  MessageFindMessageByIdQuery,
  MessageIMessageRepository,
  MessageMessageMapper,
  messageMockMessageData,
  MessageMockMessageRepository,
} from '@app/message/message';
import { MessageFindMessageByIdQueryHandler } from '@app/message/message/application/find/message-find-message-by-id.query-handler';
import { MessageFindMessageByIdService } from '@app/message/message/application/find/message-find-message-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageByIdQueryHandler', () => {
  let queryHandler: MessageFindMessageByIdQueryHandler;
  let service: MessageFindMessageByIdService;
  let repository: MessageMockMessageRepository;
  let mapper: MessageMessageMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageFindMessageByIdQueryHandler,
        {
          provide: MessageIMessageRepository,
          useClass: MessageMockMessageRepository,
        },
        {
          provide: MessageFindMessageByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<MessageFindMessageByIdQueryHandler>(
      MessageFindMessageByIdQueryHandler,
    );
    service = module.get<MessageFindMessageByIdService>(
      MessageFindMessageByIdService,
    );
    repository = <MessageMockMessageRepository>(
      module.get<MessageIMessageRepository>(MessageIMessageRepository)
    );
    mapper = new MessageMessageMapper();
  });

  describe('main', () => {
    test('FindMessageByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an message founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new MessageFindMessageByIdQuery(messageMockMessageData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
