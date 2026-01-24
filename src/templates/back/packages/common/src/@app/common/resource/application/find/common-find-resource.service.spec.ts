import {
  CommonIResourceRepository,
  CommonMockResourceRepository,
} from '@app/common/resource';
import { CommonFindResourceService } from '@app/common/resource/application/find/common-find-resource.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceService', () => {
  let service: CommonFindResourceService;
  let repository: CommonIResourceRepository;
  let mockRepository: CommonMockResourceRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindResourceService,
        CommonMockResourceRepository,
        {
          provide: CommonIResourceRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindResourceService);
    repository = module.get(CommonIResourceRepository);
    mockRepository = module.get(CommonMockResourceRepository);
  });

  describe('main', () => {
    test('CommonFindResourceService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find resource', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
