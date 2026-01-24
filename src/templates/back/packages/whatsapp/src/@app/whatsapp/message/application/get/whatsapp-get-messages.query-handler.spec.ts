import {
  WhatsappGetMessagesQuery,
  WhatsappIMessageRepository,
  WhatsappMessageMapper,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappGetMessagesQueryHandler } from '@app/whatsapp/message/application/get/whatsapp-get-messages.query-handler';
import { WhatsappGetMessagesService } from '@app/whatsapp/message/application/get/whatsapp-get-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetMessagesQueryHandler', () => {
  let queryHandler: WhatsappGetMessagesQueryHandler;
  let service: WhatsappGetMessagesService;
  let repository: WhatsappMockMessageRepository;
  let mapper: WhatsappMessageMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappGetMessagesQueryHandler,
        {
          provide: WhatsappIMessageRepository,
          useClass: WhatsappMockMessageRepository,
        },
        {
          provide: WhatsappGetMessagesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappGetMessagesQueryHandler>(
      WhatsappGetMessagesQueryHandler,
    );
    service = module.get<WhatsappGetMessagesService>(
      WhatsappGetMessagesService,
    );
    repository = <WhatsappMockMessageRepository>(
      module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository)
    );
    mapper = new WhatsappMessageMapper();
  });

  describe('main', () => {
    test('WhatsappGetMessagesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an messages founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new WhatsappGetMessagesQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
