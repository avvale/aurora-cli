import {
  WhatsappFindMessageQuery,
  WhatsappIMessageRepository,
  WhatsappMessageMapper,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappFindMessageQueryHandler } from '@app/whatsapp/message/application/find/whatsapp-find-message.query-handler';
import { WhatsappFindMessageService } from '@app/whatsapp/message/application/find/whatsapp-find-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageQueryHandler', () => {
  let queryHandler: WhatsappFindMessageQueryHandler;
  let service: WhatsappFindMessageService;
  let repository: WhatsappMockMessageRepository;
  let mapper: WhatsappMessageMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappFindMessageQueryHandler,
        {
          provide: WhatsappIMessageRepository,
          useClass: WhatsappMockMessageRepository,
        },
        {
          provide: WhatsappFindMessageService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappFindMessageQueryHandler>(
      WhatsappFindMessageQueryHandler,
    );
    service = module.get<WhatsappFindMessageService>(
      WhatsappFindMessageService,
    );
    repository = <WhatsappMockMessageRepository>(
      module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository)
    );
    mapper = new WhatsappMessageMapper();
  });

  describe('main', () => {
    test('WhatsappFindMessageQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an message founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new WhatsappFindMessageQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
