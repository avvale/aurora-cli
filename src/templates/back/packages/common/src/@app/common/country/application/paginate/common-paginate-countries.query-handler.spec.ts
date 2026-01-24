import {
  CommonICountryRepository,
  CommonMockCountryRepository,
  CommonPaginateCountriesQuery,
} from '@app/common/country';
import { CommonPaginateCountriesQueryHandler } from '@app/common/country/application/paginate/common-paginate-countries.query-handler';
import { CommonPaginateCountriesService } from '@app/common/country/application/paginate/common-paginate-countries.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateCountriesQueryHandler', () => {
  let queryHandler: CommonPaginateCountriesQueryHandler;
  let service: CommonPaginateCountriesService;
  let repository: CommonMockCountryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonPaginateCountriesQueryHandler,
        {
          provide: CommonICountryRepository,
          useClass: CommonMockCountryRepository,
        },
        {
          provide: CommonPaginateCountriesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonPaginateCountriesQueryHandler>(
      CommonPaginateCountriesQueryHandler,
    );
    service = module.get<CommonPaginateCountriesService>(
      CommonPaginateCountriesService,
    );
    repository = <CommonMockCountryRepository>(
      module.get<CommonICountryRepository>(CommonICountryRepository)
    );
  });

  describe('main', () => {
    test('CommonPaginateCountriesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an countries paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new CommonPaginateCountriesQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
