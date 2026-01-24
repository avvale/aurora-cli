import {
  CommonIAdministrativeAreaLevel3Repository,
  CommonMockAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CommonFindAdministrativeAreaLevel3Service } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3Service', () => {
  let service: CommonFindAdministrativeAreaLevel3Service;
  let repository: CommonIAdministrativeAreaLevel3Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindAdministrativeAreaLevel3Service,
        CommonMockAdministrativeAreaLevel3Repository,
        {
          provide: CommonIAdministrativeAreaLevel3Repository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindAdministrativeAreaLevel3Service);
    repository = module.get(CommonIAdministrativeAreaLevel3Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel3Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find administrativeAreaLevel3', async () => {
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
