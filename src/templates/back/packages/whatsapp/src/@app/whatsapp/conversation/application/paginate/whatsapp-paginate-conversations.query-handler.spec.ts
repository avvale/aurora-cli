import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
  WhatsappPaginateConversationsQuery,
} from '@app/whatsapp/conversation';
import { WhatsappPaginateConversationsQueryHandler } from '@app/whatsapp/conversation/application/paginate/whatsapp-paginate-conversations.query-handler';
import { WhatsappPaginateConversationsService } from '@app/whatsapp/conversation/application/paginate/whatsapp-paginate-conversations.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateConversationsQueryHandler', () => {
  let queryHandler: WhatsappPaginateConversationsQueryHandler;
  let service: WhatsappPaginateConversationsService;
  let repository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappPaginateConversationsQueryHandler,
        {
          provide: WhatsappIConversationRepository,
          useClass: WhatsappMockConversationRepository,
        },
        {
          provide: WhatsappPaginateConversationsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappPaginateConversationsQueryHandler>(
      WhatsappPaginateConversationsQueryHandler,
    );
    service = module.get<WhatsappPaginateConversationsService>(
      WhatsappPaginateConversationsService,
    );
    repository = <WhatsappMockConversationRepository>(
      module.get<WhatsappIConversationRepository>(
        WhatsappIConversationRepository,
      )
    );
  });

  describe('main', () => {
    test('WhatsappPaginateConversationsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an conversations paginated', async () => {
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
          new WhatsappPaginateConversationsQuery({
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
