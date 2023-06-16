import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockCountryRepository } from '@app/common/country/infrastructure/mock/mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { RawSQLCountriesQueryHandler } from './raw-sql-countries.query-handler';
import { RawSQLCountriesQuery } from './raw-sql-countries.query';
import { RawSQLCountriesService } from './raw-sql-countries.service';

describe('RawSQLCountriesQueryHandler', () =>
{
    let queryHandler: RawSQLCountriesQueryHandler;
    let service: RawSQLCountriesService;
    let repository: MockCountryRepository;
    let mapper: CountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLCountriesQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: MockCountryRepository,
                },
                {
                    provide : RawSQLCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<RawSQLCountriesQueryHandler>(RawSQLCountriesQueryHandler);
        service = module.get<RawSQLCountriesService>(RawSQLCountriesService);
        repository = <MockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CountryMapper();
    });

    describe('main', () =>
    {
        test('RawSQLCountriesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an countries founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLCountriesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});