import {
  WhatsappIMessageRepository,
  WhatsappMessageMapper,
  WhatsappMockMessageRepository,
  WhatsappRawSQLMessagesQuery,
} from '@app/whatsapp/message';
import { WhatsappRawSQLMessagesQueryHandler } from '@app/whatsapp/message/application/raw-sql/whatsapp-raw-sql-messages.query-handler';
import { WhatsappRawSQLMessagesService } from '@app/whatsapp/message/application/raw-sql/whatsapp-raw-sql-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLMessagesQueryHandler', () => {
  let queryHandler: WhatsappRawSQLMessagesQueryHandler;
  let service: WhatsappRawSQLMessagesService;
  let repository: WhatsappMockMessageRepository;
  let mapper: WhatsappMessageMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappRawSQLMessagesQueryHandler,
        {
          provide: WhatsappIMessageRepository,
          useClass: WhatsappMockMessageRepository,
        },
        {
          provide: WhatsappRawSQLMessagesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappRawSQLMessagesQueryHandler>(
      WhatsappRawSQLMessagesQueryHandler,
    );
    service = module.get<WhatsappRawSQLMessagesService>(
      WhatsappRawSQLMessagesService,
    );
    repository = <WhatsappMockMessageRepository>(
      module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository)
    );
    mapper = new WhatsappMessageMapper();
  });

  describe('main', () => {
    test('WhatsappRawSQLMessagesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an messages founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new WhatsappRawSQLMessagesQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
