import {
  MessageIOutboxRepository,
  MessageMockOutboxRepository,
  MessagePaginateOutboxesQuery,
} from '@app/message/outbox';
import { MessagePaginateOutboxesQueryHandler } from '@app/message/outbox/application/paginate/message-paginate-outboxes.query-handler';
import { MessagePaginateOutboxesService } from '@app/message/outbox/application/paginate/message-paginate-outboxes.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateOutboxesQueryHandler', () => {
  let queryHandler: MessagePaginateOutboxesQueryHandler;
  let service: MessagePaginateOutboxesService;
  let repository: MessageMockOutboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagePaginateOutboxesQueryHandler,
        {
          provide: MessageIOutboxRepository,
          useClass: MessageMockOutboxRepository,
        },
        {
          provide: MessagePaginateOutboxesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<MessagePaginateOutboxesQueryHandler>(
      MessagePaginateOutboxesQueryHandler,
    );
    service = module.get<MessagePaginateOutboxesService>(
      MessagePaginateOutboxesService,
    );
    repository = <MessageMockOutboxRepository>(
      module.get<MessageIOutboxRepository>(MessageIOutboxRepository)
    );
  });

  describe('main', () => {
    test('MessagePaginateOutboxesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an outboxes paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new MessagePaginateOutboxesQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
