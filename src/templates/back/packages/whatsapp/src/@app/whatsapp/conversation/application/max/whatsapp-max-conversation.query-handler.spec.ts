import {
  WhatsappIConversationRepository,
  WhatsappMaxConversationQuery,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappMaxConversationQueryHandler } from '@app/whatsapp/conversation/application/max/whatsapp-max-conversation.query-handler';
import { WhatsappMaxConversationService } from '@app/whatsapp/conversation/application/max/whatsapp-max-conversation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMaxConversationQueryHandler', () => {
  let queryHandler: WhatsappMaxConversationQueryHandler;
  let service: WhatsappMaxConversationService;
  let repository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappMaxConversationQueryHandler,
        {
          provide: WhatsappIConversationRepository,
          useClass: WhatsappMockConversationRepository,
        },
        {
          provide: WhatsappMaxConversationService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappMaxConversationQueryHandler>(
      WhatsappMaxConversationQueryHandler,
    );
    service = module.get<WhatsappMaxConversationService>(
      WhatsappMaxConversationService,
    );
    repository = <WhatsappMockConversationRepository>(
      module.get<WhatsappIConversationRepository>(
        WhatsappIConversationRepository,
      )
    );
  });

  describe('main', () => {
    test('WhatsappMaxConversationQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should max inboxes', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(repository.max(column))),
        );
      expect(
        await queryHandler.execute(new WhatsappMaxConversationQuery('id')),
      ).toStrictEqual(repository.max('id'));
    });
  });
});
