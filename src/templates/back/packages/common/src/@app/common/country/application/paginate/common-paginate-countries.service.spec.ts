import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CommonPaginateCountriesService } from './common-paginate-countries.service';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('PaginateCountriesService', () =>
{
    let service: PaginateCountriesService;
    let repository: CommonICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateCountriesService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(PaginateCountriesService);
        repository = module.get(CommonICountryRepository);
        mockRepository = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('PaginateCountriesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate countries', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});