/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonFindAdministrativeAreaLevel1Service } from '@app/common/administrative-area-level-1/application/find/common-find-administrative-area-level-1.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1Service', () => {
  let service: CommonFindAdministrativeAreaLevel1Service;
  let repository: CommonIAdministrativeAreaLevel1Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindAdministrativeAreaLevel1Service,
        CommonMockAdministrativeAreaLevel1Repository,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindAdministrativeAreaLevel1Service);
    repository = module.get(CommonIAdministrativeAreaLevel1Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find administrativeAreaLevel1', async () => {
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
