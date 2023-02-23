import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindCountryQueryHandler } from './find-country.query-handler';
import { MockCountryRepository } from '@app/common/country/infrastructure/mock/mock-country.repository';
import { ICountryRepository } from '@app/common/country/domain/country.repository';
import { CountryMapper } from '@app/common/country/domain/country.mapper';
import { FindCountryQuery } from './find-country.query';
import { FindCountryService } from './find-country.service';

describe('FindCountryQueryHandler', () =>
{
    let queryHandler: FindCountryQueryHandler;
    let service: FindCountryService;
    let repository: MockCountryRepository;
    let mapper: CountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindCountryQueryHandler,
                {
                    provide : ICountryRepository,
                    useClass: MockCountryRepository,
                },
                {
                    provide : FindCountryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindCountryQueryHandler>(FindCountryQueryHandler);
        service         = module.get<FindCountryService>(FindCountryService);
        repository      = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);
        mapper          = new CountryMapper();
    });

    describe('main', () =>
    {
        test('FindCountryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an country founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindCountryQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});