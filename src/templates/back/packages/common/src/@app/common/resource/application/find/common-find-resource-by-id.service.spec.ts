import {
  CommonIResourceRepository,
  commonMockResourceData,
  CommonMockResourceRepository,
} from '@app/common/resource';
import { CommonFindResourceByIdService } from '@app/common/resource/application/find/common-find-resource-by-id.service';
import { CommonResourceId } from '@app/common/resource/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceByIdService', () => {
  let service: CommonFindResourceByIdService;
  let repository: CommonIResourceRepository;
  let mockRepository: CommonMockResourceRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindResourceByIdService,
        CommonMockResourceRepository,
        {
          provide: CommonIResourceRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindResourceByIdService);
    repository = module.get(CommonIResourceRepository);
    mockRepository = module.get(CommonMockResourceRepository);
  });

  describe('main', () => {
    test('FindResourceByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find resource by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new CommonResourceId(commonMockResourceData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
