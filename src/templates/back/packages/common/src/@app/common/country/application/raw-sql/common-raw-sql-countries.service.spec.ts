import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLCountriesService } from './raw-sql-countries.service';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('RawSQLCountriesService', () =>
{
    let service: RawSQLCountriesService;
    let repository: CommonICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLCountriesService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLCountriesService);
        repository      = module.get(CommonICountryRepository);
        mockRepository  = module.get(MockCountryRepository);
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