/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonIAdministrativeAreaLevel2Repository,
  commonMockAdministrativeAreaLevel2Data,
  CommonMockAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CommonFindAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2-by-id.service';
import { CommonAdministrativeAreaLevel2Id } from '@app/common/administrative-area-level-2/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2ByIdService', () => {
  let service: CommonFindAdministrativeAreaLevel2ByIdService;
  let repository: CommonIAdministrativeAreaLevel2Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindAdministrativeAreaLevel2ByIdService,
        CommonMockAdministrativeAreaLevel2Repository,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindAdministrativeAreaLevel2ByIdService);
    repository = module.get(CommonIAdministrativeAreaLevel2Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel2Repository);
  });

  describe('main', () => {
    test('FindAdministrativeAreaLevel2ByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find administrativeAreaLevel2 by id', async () => {
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
          new CommonAdministrativeAreaLevel2Id(
            commonMockAdministrativeAreaLevel2Data[0].id,
          ),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
