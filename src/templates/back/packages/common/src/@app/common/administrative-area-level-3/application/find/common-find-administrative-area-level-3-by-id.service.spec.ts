/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonIAdministrativeAreaLevel3Repository,
  commonMockAdministrativeAreaLevel3Data,
  CommonMockAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CommonFindAdministrativeAreaLevel3ByIdService } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3-by-id.service';
import { CommonAdministrativeAreaLevel3Id } from '@app/common/administrative-area-level-3/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3ByIdService', () => {
  let service: CommonFindAdministrativeAreaLevel3ByIdService;
  let repository: CommonIAdministrativeAreaLevel3Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindAdministrativeAreaLevel3ByIdService,
        CommonMockAdministrativeAreaLevel3Repository,
        {
          provide: CommonIAdministrativeAreaLevel3Repository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindAdministrativeAreaLevel3ByIdService);
    repository = module.get(CommonIAdministrativeAreaLevel3Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
  });

  describe('main', () => {
    test('FindAdministrativeAreaLevel3ByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find administrativeAreaLevel3 by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new CommonAdministrativeAreaLevel3Id(
            commonMockAdministrativeAreaLevel3Data[0].id,
          ),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
