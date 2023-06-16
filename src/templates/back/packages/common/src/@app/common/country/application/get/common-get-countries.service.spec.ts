import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetCountriesService } from './get-countries.service';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('GetCountriesService', () =>
{
    let service: GetCountriesService;
    let repository: CommonICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetCountriesService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(GetCountriesService);
        repository = module.get(CommonICountryRepository);
        mockRepository = module.get(MockCountryRepository);
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