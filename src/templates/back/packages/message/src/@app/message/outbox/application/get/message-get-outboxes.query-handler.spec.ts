import {
  MessageGetOutboxesQuery,
  MessageIOutboxRepository,
  MessageMockOutboxRepository,
  MessageOutboxMapper,
} from '@app/message/outbox';
import { MessageGetOutboxesQueryHandler } from '@app/message/outbox/application/get/message-get-outboxes.query-handler';
import { MessageGetOutboxesService } from '@app/message/outbox/application/get/message-get-outboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetOutboxesQueryHandler', () => {
  let queryHandler: MessageGetOutboxesQueryHandler;
  let service: MessageGetOutboxesService;
  let repository: MessageMockOutboxRepository;
  let mapper: MessageOutboxMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageGetOutboxesQueryHandler,
        {
          provide: MessageIOutboxRepository,
          useClass: MessageMockOutboxRepository,
        },
        {
          provide: MessageGetOutboxesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<MessageGetOutboxesQueryHandler>(
      MessageGetOutboxesQueryHandler,
    );
    service = module.get<MessageGetOutboxesService>(MessageGetOutboxesService);
    repository = <MessageMockOutboxRepository>(
      module.get<MessageIOutboxRepository>(MessageIOutboxRepository)
    );
    mapper = new MessageOutboxMapper();
  });

  describe('main', () => {
    test('MessageGetOutboxesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an outboxes founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new MessageGetOutboxesQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
