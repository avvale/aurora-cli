import {
  CommonIAdministrativeAreaLevel2Repository,
  CommonMockAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CommonRawSQLAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/raw-sql/common-raw-sql-administrative-areas-level-2.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLAdministrativeAreasLevel2Service ', () => {
  let service: CommonRawSQLAdministrativeAreasLevel2Service;
  let repository: CommonIAdministrativeAreaLevel2Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonRawSQLAdministrativeAreasLevel2Service,
        CommonMockAdministrativeAreaLevel2Repository,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useValue: {
            rawSQL: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonRawSQLAdministrativeAreasLevel2Service);
    repository = module.get(CommonIAdministrativeAreaLevel2Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel2Repository);
  });

  describe('main', () => {
    test('RawSQLAdministrativeAreasLevel2Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get administrativeAreasLevel2', async () => {
      jest
        .spyOn(repository, 'rawSQL')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
