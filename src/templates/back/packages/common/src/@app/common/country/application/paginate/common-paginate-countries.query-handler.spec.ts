import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateCountriesQueryHandler } from './common-paginate-countries.query-handler';
import { MockCountryRepository } from '@app/common/country/infrastructure/mock/mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { CommonPaginateCountriesQuery } from './common-paginate-countries.query';
import { CommonPaginateCountriesService } from './common-paginate-countries.service';

describe('PaginateCountriesQueryHandler', () =>
{
    let queryHandler: PaginateCountriesQueryHandler;
    let service: PaginateCountriesService;
    let repository: MockCountryRepository;
    let mapper: CountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateCountriesQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: MockCountryRepository,
                },
                {
                    provide : PaginateCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<PaginateCountriesQueryHandler>(PaginateCountriesQueryHandler);
        service = module.get<PaginateCountriesService>(PaginateCountriesService);
        repository = <MockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CountryMapper();
    });

    describe('main', () =>
    {
        test('PaginateCountriesQueryHandler should be defined', () =>
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
                new PaginateCountriesQuery(
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