/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonILangRepository,
  CommonMockLangRepository,
} from '@app/common/lang';
import { CommonPaginateLangsService } from '@app/common/lang/application/paginate/common-paginate-langs.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateLangsService', () => {
  let service: CommonPaginateLangsService;
  let repository: CommonILangRepository;
  let mockRepository: CommonMockLangRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonPaginateLangsService,
        CommonMockLangRepository,
        {
          provide: CommonILangRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonPaginateLangsService);
    repository = module.get(CommonILangRepository);
    mockRepository = module.get(CommonMockLangRepository);
  });

  describe('main', () => {
    test('CommonPaginateLangsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate langs', async () => {
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
