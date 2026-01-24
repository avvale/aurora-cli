import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
  WhatsappPaginateMessagesQuery,
} from '@app/whatsapp/message';
import { WhatsappPaginateMessagesQueryHandler } from '@app/whatsapp/message/application/paginate/whatsapp-paginate-messages.query-handler';
import { WhatsappPaginateMessagesService } from '@app/whatsapp/message/application/paginate/whatsapp-paginate-messages.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateMessagesQueryHandler', () => {
  let queryHandler: WhatsappPaginateMessagesQueryHandler;
  let service: WhatsappPaginateMessagesService;
  let repository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappPaginateMessagesQueryHandler,
        {
          provide: WhatsappIMessageRepository,
          useClass: WhatsappMockMessageRepository,
        },
        {
          provide: WhatsappPaginateMessagesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappPaginateMessagesQueryHandler>(
      WhatsappPaginateMessagesQueryHandler,
    );
    service = module.get<WhatsappPaginateMessagesService>(
      WhatsappPaginateMessagesService,
    );
    repository = <WhatsappMockMessageRepository>(
      module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository)
    );
  });

  describe('main', () => {
    test('WhatsappPaginateMessagesQueryHandler should be defined', () => {
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
          new WhatsappPaginateMessagesQuery({
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
