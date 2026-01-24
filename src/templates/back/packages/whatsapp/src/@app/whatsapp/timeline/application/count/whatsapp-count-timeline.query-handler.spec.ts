import {
  WhatsappCountTimelineQuery,
  WhatsappITimelineRepository,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappCountTimelineQueryHandler } from '@app/whatsapp/timeline/application/count/whatsapp-count-timeline.query-handler';
import { WhatsappCountTimelineService } from '@app/whatsapp/timeline/application/count/whatsapp-count-timeline.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCountTimelineQueryHandler', () => {
  let queryHandler: WhatsappCountTimelineQueryHandler;
  let service: WhatsappCountTimelineService;
  let repository: WhatsappMockTimelineRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappCountTimelineQueryHandler,
        {
          provide: WhatsappITimelineRepository,
          useClass: WhatsappMockTimelineRepository,
        },
        {
          provide: WhatsappCountTimelineService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappCountTimelineQueryHandler>(
      WhatsappCountTimelineQueryHandler,
    );
    service = module.get<WhatsappCountTimelineService>(
      WhatsappCountTimelineService,
    );
    repository = <WhatsappMockTimelineRepository>(
      module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository)
    );
  });

  describe('main', () => {
    test('WhatsappCountTimelineQueryHandler should be defined', () => {
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
        await queryHandler.execute(new WhatsappCountTimelineQuery()),
      ).toStrictEqual(repository.collectionSource.length);
    });
  });
});
