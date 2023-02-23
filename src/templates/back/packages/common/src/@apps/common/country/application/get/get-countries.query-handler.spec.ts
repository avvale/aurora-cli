import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetCountriesQueryHandler } from './get-countries.query-handler';
import { MockCountryRepository } from '@app/common/country/infrastructure/mock/mock-country.repository';
import { ICountryRepository } from '@app/common/country/domain/country.repository';
import { CountryMapper } from '@app/common/country/domain/country.mapper';
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
                    provide : ICountryRepository,
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

        queryHandler    = module.get<GetCountriesQueryHandler>(GetCountriesQueryHandler);
        service         = module.get<GetCountriesService>(GetCountriesService);
        repository      = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);
        mapper          = new CountryMapper();
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