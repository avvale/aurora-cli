import {
  WhatsappConversationMapper,
  WhatsappFindConversationByIdQuery,
  WhatsappIConversationRepository,
  whatsappMockConversationData,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappFindConversationByIdQueryHandler } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation-by-id.query-handler';
import { WhatsappFindConversationByIdService } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationByIdQueryHandler', () => {
  let queryHandler: WhatsappFindConversationByIdQueryHandler;
  let service: WhatsappFindConversationByIdService;
  let repository: WhatsappMockConversationRepository;
  let mapper: WhatsappConversationMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappFindConversationByIdQueryHandler,
        {
          provide: WhatsappIConversationRepository,
          useClass: WhatsappMockConversationRepository,
        },
        {
          provide: WhatsappFindConversationByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappFindConversationByIdQueryHandler>(
      WhatsappFindConversationByIdQueryHandler,
    );
    service = module.get<WhatsappFindConversationByIdService>(
      WhatsappFindConversationByIdService,
    );
    repository = <WhatsappMockConversationRepository>(
      module.get<WhatsappIConversationRepository>(
        WhatsappIConversationRepository,
      )
    );
    mapper = new WhatsappConversationMapper();
  });

  describe('main', () => {
    test('FindConversationByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an conversation founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new WhatsappFindConversationByIdQuery(
            whatsappMockConversationData[0].id,
          ),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
