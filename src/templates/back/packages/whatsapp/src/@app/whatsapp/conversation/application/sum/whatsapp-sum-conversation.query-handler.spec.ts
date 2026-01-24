import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
  WhatsappSumConversationQuery,
} from '@app/whatsapp/conversation';
import { WhatsappSumConversationQueryHandler } from '@app/whatsapp/conversation/application/sum/whatsapp-sum-conversation.query-handler';
import { WhatsappSumConversationService } from '@app/whatsapp/conversation/application/sum/whatsapp-sum-conversation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappSumConversationQueryHandler', () => {
  let queryHandler: WhatsappSumConversationQueryHandler;
  let service: WhatsappSumConversationService;
  let repository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappSumConversationQueryHandler,
        {
          provide: WhatsappIConversationRepository,
          useClass: WhatsappMockConversationRepository,
        },
        {
          provide: WhatsappSumConversationService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappSumConversationQueryHandler>(
      WhatsappSumConversationQueryHandler,
    );
    service = module.get<WhatsappSumConversationService>(
      WhatsappSumConversationService,
    );
    repository = <WhatsappMockConversationRepository>(
      module.get<WhatsappIConversationRepository>(
        WhatsappIConversationRepository,
      )
    );
  });

  describe('main', () => {
    test('WhatsappSumConversationQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should sum inboxes', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(repository.sum(column))),
        );
      expect(
        await queryHandler.execute(new WhatsappSumConversationQuery('id')),
      ).toStrictEqual(repository.sum('id'));
    });
  });
});
