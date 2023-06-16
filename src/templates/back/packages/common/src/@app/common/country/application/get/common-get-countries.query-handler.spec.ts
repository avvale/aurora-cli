import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetCountriesQueryHandler } from './get-countries.query-handler';
import { MockCountryRepository } from '@app/common/country/infrastructure/mock/mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { GetCountriesQuery } from './get-countries.query';
import { GetCountriesService } from './get-countries.service';

describe('GetCountriesQueryHandler', () =>
{
    let queryHandler: GetCountriesQueryHandler;
    let service: GetCountriesService;
    let repository: MockCountryRepository;
    let mapper: CountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetCountriesQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: MockCountryRepository,
                },
                {
                    provide : GetCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<GetCountriesQueryHandler>(GetCountriesQueryHandler);
        service = module.get<GetCountriesService>(GetCountriesService);
        repository = <MockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CountryMapper();
    });

    describe('main', () =>
    {
        test('GetCountriesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an countries founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetCountriesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});