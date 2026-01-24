import {
  QueueManagerFindJobRegistryQuery,
  QueueManagerIJobRegistryRepository,
  QueueManagerJobRegistryMapper,
  QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerFindJobRegistryQueryHandler } from '@app/queue-manager/job-registry/application/find/queue-manager-find-job-registry.query-handler';
import { QueueManagerFindJobRegistryService } from '@app/queue-manager/job-registry/application/find/queue-manager-find-job-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryQueryHandler', () => {
  let queryHandler: QueueManagerFindJobRegistryQueryHandler;
  let service: QueueManagerFindJobRegistryService;
  let repository: QueueManagerMockJobRegistryRepository;
  let mapper: QueueManagerJobRegistryMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueManagerFindJobRegistryQueryHandler,
        {
          provide: QueueManagerIJobRegistryRepository,
          useClass: QueueManagerMockJobRegistryRepository,
        },
        {
          provide: QueueManagerFindJobRegistryService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<QueueManagerFindJobRegistryQueryHandler>(
      QueueManagerFindJobRegistryQueryHandler,
    );
    service = module.get<QueueManagerFindJobRegistryService>(
      QueueManagerFindJobRegistryService,
    );
    repository = <QueueManagerMockJobRegistryRepository>(
      module.get<QueueManagerIJobRegistryRepository>(
        QueueManagerIJobRegistryRepository,
      )
    );
    mapper = new QueueManagerJobRegistryMapper();
  });

  describe('main', () => {
    test('QueueManagerFindJobRegistryQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an jobRegistry founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new QueueManagerFindJobRegistryQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
