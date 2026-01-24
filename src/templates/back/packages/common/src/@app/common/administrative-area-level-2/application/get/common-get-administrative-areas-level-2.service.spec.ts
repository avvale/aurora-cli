import {
  CommonIAdministrativeAreaLevel2Repository,
  CommonMockAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CommonGetAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/get/common-get-administrative-areas-level-2.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel2Service', () => {
  let service: CommonGetAdministrativeAreasLevel2Service;
  let repository: CommonIAdministrativeAreaLevel2Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonGetAdministrativeAreasLevel2Service,
        CommonMockAdministrativeAreaLevel2Repository,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonGetAdministrativeAreasLevel2Service);
    repository = module.get(CommonIAdministrativeAreaLevel2Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel2Repository);
  });

  describe('main', () => {
    test('GetAdministrativeAreasLevel2Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get administrativeAreasLevel2', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
