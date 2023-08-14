import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonMockCountryRepository } from '@app/common/country/infrastructure/mock/common-mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { CommonRawSQLCountriesQueryHandler } from './common-raw-sql-countries.query-handler';
import { CommonRawSQLCountriesQuery } from './common-raw-sql-countries.query';
import { CommonRawSQLCountriesService } from './common-raw-sql-countries.service';

describe('RawSQLCountriesQueryHandler', () =>
{
    let queryHandler: CommonRawSQLCountriesQueryHandler;
    let service: CommonRawSQLCountriesService;
    let repository: CommonMockCountryRepository;
    let mapper: CommonCountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLCountriesQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: CommonMockCountryRepository,
                },
                {
                    provide : CommonRawSQLCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLCountriesQueryHandler>(CommonRawSQLCountriesQueryHandler);
        service = module.get<CommonRawSQLCountriesService>(CommonRawSQLCountriesService);
        repository = <CommonMockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CommonCountryMapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLCountriesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an countries founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLCountriesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
