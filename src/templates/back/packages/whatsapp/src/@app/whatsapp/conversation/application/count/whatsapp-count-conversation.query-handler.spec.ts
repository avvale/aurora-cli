import {
  WhatsappCountConversationQuery,
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappCountConversationQueryHandler } from '@app/whatsapp/conversation/application/count/whatsapp-count-conversation.query-handler';
import { WhatsappCountConversationService } from '@app/whatsapp/conversation/application/count/whatsapp-count-conversation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCountConversationQueryHandler', () => {
  let queryHandler: WhatsappCountConversationQueryHandler;
  let service: WhatsappCountConversationService;
  let repository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappCountConversationQueryHandler,
        {
          provide: WhatsappIConversationRepository,
          useClass: WhatsappMockConversationRepository,
        },
        {
          provide: WhatsappCountConversationService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappCountConversationQueryHandler>(
      WhatsappCountConversationQueryHandler,
    );
    service = module.get<WhatsappCountConversationService>(
      WhatsappCountConversationService,
    );
    repository = <WhatsappMockConversationRepository>(
      module.get<WhatsappIConversationRepository>(
        WhatsappIConversationRepository,
      )
    );
  });

  describe('main', () => {
    test('WhatsappCountConversationQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should count total inboxes', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(repository.collectionSource.length),
            ),
        );
      expect(
        await queryHandler.execute(new WhatsappCountConversationQuery()),
      ).toStrictEqual(repository.collectionSource.length);
    });
  });
});
