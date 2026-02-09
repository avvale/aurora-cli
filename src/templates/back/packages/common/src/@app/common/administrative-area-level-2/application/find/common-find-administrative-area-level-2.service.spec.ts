/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonIAdministrativeAreaLevel2Repository,
  CommonMockAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CommonFindAdministrativeAreaLevel2Service } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2Service', () => {
  let service: CommonFindAdministrativeAreaLevel2Service;
  let repository: CommonIAdministrativeAreaLevel2Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindAdministrativeAreaLevel2Service,
        CommonMockAdministrativeAreaLevel2Repository,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindAdministrativeAreaLevel2Service);
    repository = module.get(CommonIAdministrativeAreaLevel2Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel2Repository);
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel2Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find administrativeAreaLevel2', async () => {
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
