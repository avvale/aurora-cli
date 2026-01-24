import {
  MessageIInboxRepository,
  MessageMockInboxRepository,
  MessagePaginateInboxesQuery,
} from '@app/message/inbox';
import { MessagePaginateInboxesQueryHandler } from '@app/message/inbox/application/paginate/message-paginate-inboxes.query-handler';
import { MessagePaginateInboxesService } from '@app/message/inbox/application/paginate/message-paginate-inboxes.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxesQueryHandler', () => {
  let queryHandler: MessagePaginateInboxesQueryHandler;
  let service: MessagePaginateInboxesService;
  let repository: MessageMockInboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagePaginateInboxesQueryHandler,
        {
          provide: MessageIInboxRepository,
          useClass: MessageMockInboxRepository,
        },
        {
          provide: MessagePaginateInboxesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<MessagePaginateInboxesQueryHandler>(
      MessagePaginateInboxesQueryHandler,
    );
    service = module.get<MessagePaginateInboxesService>(
      MessagePaginateInboxesService,
    );
    repository = <MessageMockInboxRepository>(
      module.get<MessageIInboxRepository>(MessageIInboxRepository)
    );
  });

  describe('main', () => {
    test('MessagePaginateInboxesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an inboxes paginated', async () => {
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
          new MessagePaginateInboxesQuery({
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
