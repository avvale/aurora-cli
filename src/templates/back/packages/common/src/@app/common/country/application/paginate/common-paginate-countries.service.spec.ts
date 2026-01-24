import {
  CommonICountryRepository,
  CommonMockCountryRepository,
} from '@app/common/country';
import { CommonPaginateCountriesService } from '@app/common/country/application/paginate/common-paginate-countries.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateCountriesService', () => {
  let service: CommonPaginateCountriesService;
  let repository: CommonICountryRepository;
  let mockRepository: CommonMockCountryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonPaginateCountriesService,
        CommonMockCountryRepository,
        {
          provide: CommonICountryRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonPaginateCountriesService);
    repository = module.get(CommonICountryRepository);
    mockRepository = module.get(CommonMockCountryRepository);
  });

  describe('main', () => {
    test('CommonPaginateCountriesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate countries', async () => {
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
