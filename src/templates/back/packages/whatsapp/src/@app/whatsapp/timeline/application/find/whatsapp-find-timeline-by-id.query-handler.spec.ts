import {
  WhatsappFindTimelineByIdQuery,
  WhatsappITimelineRepository,
  whatsappMockTimelineData,
  WhatsappMockTimelineRepository,
  WhatsappTimelineMapper,
} from '@app/whatsapp/timeline';
import { WhatsappFindTimelineByIdQueryHandler } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline-by-id.query-handler';
import { WhatsappFindTimelineByIdService } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineByIdQueryHandler', () => {
  let queryHandler: WhatsappFindTimelineByIdQueryHandler;
  let service: WhatsappFindTimelineByIdService;
  let repository: WhatsappMockTimelineRepository;
  let mapper: WhatsappTimelineMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappFindTimelineByIdQueryHandler,
        {
          provide: WhatsappITimelineRepository,
          useClass: WhatsappMockTimelineRepository,
        },
        {
          provide: WhatsappFindTimelineByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<WhatsappFindTimelineByIdQueryHandler>(
      WhatsappFindTimelineByIdQueryHandler,
    );
    service = module.get<WhatsappFindTimelineByIdService>(
      WhatsappFindTimelineByIdService,
    );
    repository = <WhatsappMockTimelineRepository>(
      module.get<WhatsappITimelineRepository>(WhatsappITimelineRepository)
    );
    mapper = new WhatsappTimelineMapper();
  });

  describe('main', () => {
    test('FindTimelineByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an timeline founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new WhatsappFindTimelineByIdQuery(whatsappMockTimelineData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
