import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateCountriesQueryHandler } from './common-paginate-countries.query-handler';
import { CommonMockCountryRepository } from '@app/common/country/infrastructure/mock/common-mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { CommonPaginateCountriesQuery } from './common-paginate-countries.query';
import { CommonPaginateCountriesService } from './common-paginate-countries.service';

describe('CommonPaginateCountriesQueryHandler', () =>
{
    let queryHandler: CommonPaginateCountriesQueryHandler;
    let service: CommonPaginateCountriesService;
    let repository: CommonMockCountryRepository;
    let mapper: CommonCountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateCountriesQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: CommonMockCountryRepository,
                },
                {
                    provide : CommonPaginateCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateCountriesQueryHandler>(CommonPaginateCountriesQueryHandler);
        service = module.get<CommonPaginateCountriesService>(CommonPaginateCountriesService);
        repository = <CommonMockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CommonCountryMapper();
    });

    describe('main', () =>
    {
        test('CommonPaginateCountriesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an countries paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateCountriesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});