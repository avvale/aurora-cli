import {
  MessageFindOutboxQuery,
  MessageIOutboxRepository,
  MessageMockOutboxRepository,
  MessageOutboxMapper,
} from '@app/message/outbox';
import { MessageFindOutboxQueryHandler } from '@app/message/outbox/application/find/message-find-outbox.query-handler';
import { MessageFindOutboxService } from '@app/message/outbox/application/find/message-find-outbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxQueryHandler', () => {
  let queryHandler: MessageFindOutboxQueryHandler;
  let service: MessageFindOutboxService;
  let repository: MessageMockOutboxRepository;
  let mapper: MessageOutboxMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageFindOutboxQueryHandler,
        {
          provide: MessageIOutboxRepository,
          useClass: MessageMockOutboxRepository,
        },
        {
          provide: MessageFindOutboxService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<MessageFindOutboxQueryHandler>(
      MessageFindOutboxQueryHandler,
    );
    service = module.get<MessageFindOutboxService>(MessageFindOutboxService);
    repository = <MessageMockOutboxRepository>(
      module.get<MessageIOutboxRepository>(MessageIOutboxRepository)
    );
    mapper = new MessageOutboxMapper();
  });

  describe('main', () => {
    test('MessageFindOutboxQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an outbox founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new MessageFindOutboxQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
