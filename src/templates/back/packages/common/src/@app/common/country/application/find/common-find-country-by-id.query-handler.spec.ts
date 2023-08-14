import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindCountryByIdQueryHandler } from './common-find-country-by-id.query-handler';
import { CommonMockCountryRepository } from '@app/common/country/infrastructure/mock/common-mock-country.repository';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { CommonFindCountryByIdQuery } from './common-find-country-by-id.query';
import { CommonFindCountryByIdService } from './common-find-country-by-id.service';

describe('CommonFindCountryByIdQueryHandler', () =>
{
    let queryHandler: CommonFindCountryByIdQueryHandler;
    let service: CommonFindCountryByIdService;
    let repository: CommonMockCountryRepository;
    let mapper: CommonCountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindCountryByIdQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: CommonMockCountryRepository,
                },
                {
                    provide : CommonFindCountryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindCountryByIdQueryHandler>(CommonFindCountryByIdQueryHandler);
        service = module.get<CommonFindCountryByIdService>(CommonFindCountryByIdService);
        repository = <CommonMockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CommonCountryMapper();
    });

    describe('main', () =>
    {
        test('FindCountryByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an country founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindCountryByIdQuery(
                    commonMockCountryData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
