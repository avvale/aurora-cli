import {
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonPaginateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/paginate/common-paginate-administrative-areas-level-1.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel1Service', () => {
  let service: CommonPaginateAdministrativeAreasLevel1Service;
  let repository: CommonIAdministrativeAreaLevel1Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonPaginateAdministrativeAreasLevel1Service,
        CommonMockAdministrativeAreaLevel1Repository,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonPaginateAdministrativeAreasLevel1Service);
    repository = module.get(CommonIAdministrativeAreaLevel1Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
  });

  describe('main', () => {
    test('CommonPaginateAdministrativeAreasLevel1Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate administrativeAreasLevel1', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
