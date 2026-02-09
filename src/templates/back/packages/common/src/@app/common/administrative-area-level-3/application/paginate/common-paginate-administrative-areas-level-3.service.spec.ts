/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonIAdministrativeAreaLevel3Repository,
  CommonMockAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CommonPaginateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/paginate/common-paginate-administrative-areas-level-3.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel3Service', () => {
  let service: CommonPaginateAdministrativeAreasLevel3Service;
  let repository: CommonIAdministrativeAreaLevel3Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonPaginateAdministrativeAreasLevel3Service,
        CommonMockAdministrativeAreaLevel3Repository,
        {
          provide: CommonIAdministrativeAreaLevel3Repository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonPaginateAdministrativeAreasLevel3Service);
    repository = module.get(CommonIAdministrativeAreaLevel3Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
  });

  describe('main', () => {
    test('CommonPaginateAdministrativeAreasLevel3Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate administrativeAreasLevel3', async () => {
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
