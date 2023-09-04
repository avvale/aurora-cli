import { CommonICountryRepository, CommonMockCountryRepository } from '@app/common/country';
import { CommonGetCountriesService } from '@app/common/country/application/get/common-get-countries.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetCountriesService', () =>
{
    let service: CommonGetCountriesService;
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
                CommonGetCountriesService,
                CommonMockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonGetCountriesService);
        repository = module.get(CommonICountryRepository);
        mockRepository = module.get(CommonMockCountryRepository);
    });

    describe('main', () =>
    {
        test('GetCountriesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get countries', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
