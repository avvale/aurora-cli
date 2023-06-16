import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindCountryQueryHandler } from './common-find-country.query-handler';
import { MockCountryRepository } from '@app/common/country/infrastructure/mock/mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { FindCountryQuery } from './common-find-country.query';
import { FindCountryService } from './common-find-country.service';

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
                    provide : CommonICountryRepository,
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

        queryHandler = module.get<FindCountryQueryHandler>(FindCountryQueryHandler);
        service = module.get<FindCountryService>(FindCountryService);
        repository = <MockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CountryMapper();
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