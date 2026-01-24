import {
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonRawSQLAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/raw-sql/common-raw-sql-administrative-areas-level-1.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLAdministrativeAreasLevel1Service ', () => {
  let service: CommonRawSQLAdministrativeAreasLevel1Service;
  let repository: CommonIAdministrativeAreaLevel1Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonRawSQLAdministrativeAreasLevel1Service,
        CommonMockAdministrativeAreaLevel1Repository,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useValue: {
            rawSQL: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonRawSQLAdministrativeAreasLevel1Service);
    repository = module.get(CommonIAdministrativeAreaLevel1Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
  });

  describe('main', () => {
    test('RawSQLAdministrativeAreasLevel1Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get administrativeAreasLevel1', async () => {
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
