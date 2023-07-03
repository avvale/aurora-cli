import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindCountryQueryHandler } from './common-find-country.query-handler';
import { CommonMockCountryRepository } from '@app/common/country/infrastructure/mock/common-mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { CommonFindCountryQuery } from './common-find-country.query';
import { CommonFindCountryService } from './common-find-country.service';

describe('CommonFindCountryQueryHandler', () =>
{
    let queryHandler: CommonFindCountryQueryHandler;
    let service: CommonFindCountryService;
    let repository: CommonMockCountryRepository;
    let mapper: CommonCountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindCountryQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: CommonMockCountryRepository,
                },
                {
                    provide : CommonFindCountryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindCountryQueryHandler>(CommonFindCountryQueryHandler);
        service = module.get<CommonFindCountryService>(CommonFindCountryService);
        repository = <CommonMockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CommonCountryMapper();
    });

    describe('main', () =>
    {
        test('CommonFindCountryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an country founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindCountryQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});