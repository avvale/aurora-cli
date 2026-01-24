import {
  QueueManagerFindJobRegistryByIdQuery,
  QueueManagerIJobRegistryRepository,
  QueueManagerJobRegistryMapper,
  queueManagerMockJobRegistryData,
  QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerFindJobRegistryByIdQueryHandler } from '@app/queue-manager/job-registry/application/find/queue-manager-find-job-registry-by-id.query-handler';
import { QueueManagerFindJobRegistryByIdService } from '@app/queue-manager/job-registry/application/find/queue-manager-find-job-registry-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryByIdQueryHandler', () => {
  let queryHandler: QueueManagerFindJobRegistryByIdQueryHandler;
  let service: QueueManagerFindJobRegistryByIdService;
  let repository: QueueManagerMockJobRegistryRepository;
  let mapper: QueueManagerJobRegistryMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueManagerFindJobRegistryByIdQueryHandler,
        {
          provide: QueueManagerIJobRegistryRepository,
          useClass: QueueManagerMockJobRegistryRepository,
        },
        {
          provide: QueueManagerFindJobRegistryByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<QueueManagerFindJobRegistryByIdQueryHandler>(
      QueueManagerFindJobRegistryByIdQueryHandler,
    );
    service = module.get<QueueManagerFindJobRegistryByIdService>(
      QueueManagerFindJobRegistryByIdService,
    );
    repository = <QueueManagerMockJobRegistryRepository>(
      module.get<QueueManagerIJobRegistryRepository>(
        QueueManagerIJobRegistryRepository,
      )
    );
    mapper = new QueueManagerJobRegistryMapper();
  });

  describe('main', () => {
    test('FindJobRegistryByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new QueueManagerFindJobRegistryByIdQuery(
            queueManagerMockJobRegistryData[0].id,
          ),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
