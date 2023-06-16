import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { FindCountryByIdService } from './common-find-country-by-id.service';
import { CommonCountryId } from '../../domain/value-objects';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('FindCountryByIdService', () =>
{
    let service: FindCountryByIdService;
    let repository: CommonICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindCountryByIdService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(FindCountryByIdService);
        repository = module.get(CommonICountryRepository);
        mockRepository = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('FindCountryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find country by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CountryId(countries[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});