import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { PaginateCountriesQueryHandler } from './paginate-countries.query-handler';
import { MockCountryRepository } from '@app/common/country/infrastructure/mock/mock-country.repository';
import { ICountryRepository } from '@app/common/country/domain/country.repository';
import { CountryMapper } from '@app/common/country/domain/country.mapper';
import { PaginateCountriesQuery } from './paginate-countries.query';
import { PaginateCountriesService } from './paginate-countries.service';

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
                    provide : ICountryRepository,
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

        queryHandler    = module.get<PaginateCountriesQueryHandler>(PaginateCountriesQueryHandler);
        service         = module.get<PaginateCountriesService>(PaginateCountriesService);
        repository      = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);
        mapper          = new CountryMapper();
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