/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamIBoundedContextRepository,
  IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamPaginateBoundedContextsService } from '@app/iam/bounded-context/application/paginate/iam-paginate-bounded-contexts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateBoundedContextsService', () => {
  let service: IamPaginateBoundedContextsService;
  let repository: IamIBoundedContextRepository;
  let mockRepository: IamMockBoundedContextRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamPaginateBoundedContextsService,
        IamMockBoundedContextRepository,
        {
          provide: IamIBoundedContextRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamPaginateBoundedContextsService);
    repository = module.get(IamIBoundedContextRepository);
    mockRepository = module.get(IamMockBoundedContextRepository);
  });

  describe('main', () => {
    test('IamPaginateBoundedContextsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate boundedContexts', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
