import { CommonICountryRepository, CommonMockCountryRepository } from '@app/common/country';
import { CommonRawSQLCountriesService } from '@app/common/country/application/raw-sql/common-raw-sql-countries.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLCountriesService ', () =>
{
    let service: CommonRawSQLCountriesService ;
    let repository: CommonICountryRepository;
    let mockRepository: CommonMockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonRawSQLCountriesService ,
                CommonMockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonRawSQLCountriesService );
        repository      = module.get(CommonICountryRepository);
        mockRepository  = module.get(CommonMockCountryRepository);
    });

    describe('main', () =>
    {
        test('RawSQLCountriesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get countries', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
