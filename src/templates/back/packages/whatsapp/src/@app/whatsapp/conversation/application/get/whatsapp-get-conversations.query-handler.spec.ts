import {
  WhatsappConversationMapper,
  WhatsappGetConversationsQuery,
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappGetConversationsQueryHandler } from '@app/whatsapp/conversation/application/get/whatsapp-get-conversations.query-handler';
import { WhatsappGetConversationsService } from '@app/whatsapp/conversation/application/get/whatsapp-get-conversations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetConversationsQueryHandler', () => {
  let queryHandler: WhatsappGetConversationsQueryHandler;
  let service: WhatsappGetConversationsService;
  let repository: WhatsappMockConversationRepository;
  let mapper: WhatsappConversationMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappGetConversationsQueryHandler,
        {
          provide: WhatsappIConversationRepository,
          useClass: WhatsappMockConversationRepository,
        },
        {
          provide: WhatsappGetConversationsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappGetConversationsQueryHandler>(
      WhatsappGetConversationsQueryHandler,
    );
    service = module.get<WhatsappGetConversationsService>(
      WhatsappGetConversationsService,
    );
    repository = <WhatsappMockConversationRepository>(
      module.get<WhatsappIConversationRepository>(
        WhatsappIConversationRepository,
      )
    );
    mapper = new WhatsappConversationMapper();
  });

  describe('main', () => {
    test('WhatsappGetConversationsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an conversations founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new WhatsappGetConversationsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
