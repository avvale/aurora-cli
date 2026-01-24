import {
  MessageIMessageRepository,
  MessageMockMessageRepository,
  MessagePaginateMessagesQuery,
} from '@app/message/message';
import { MessagePaginateMessagesQueryHandler } from '@app/message/message/application/paginate/message-paginate-messages.query-handler';
import { MessagePaginateMessagesService } from '@app/message/message/application/paginate/message-paginate-messages.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateMessagesQueryHandler', () => {
  let queryHandler: MessagePaginateMessagesQueryHandler;
  let service: MessagePaginateMessagesService;
  let repository: MessageMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagePaginateMessagesQueryHandler,
        {
          provide: MessageIMessageRepository,
          useClass: MessageMockMessageRepository,
        },
        {
          provide: MessagePaginateMessagesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<MessagePaginateMessagesQueryHandler>(
      MessagePaginateMessagesQueryHandler,
    );
    service = module.get<MessagePaginateMessagesService>(
      MessagePaginateMessagesService,
    );
    repository = <MessageMockMessageRepository>(
      module.get<MessageIMessageRepository>(MessageIMessageRepository)
    );
  });

  describe('main', () => {
    test('MessagePaginateMessagesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an messages paginated', async () => {
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
          new MessagePaginateMessagesQuery({
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
