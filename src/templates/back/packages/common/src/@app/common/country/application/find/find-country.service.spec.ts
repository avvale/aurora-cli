import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindCountryService } from './find-country.service';
import { ICountryRepository } from '../../domain/country.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('FindCountryService', () =>
{
    let service: FindCountryService;
    let repository: ICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindCountryService,
                MockCountryRepository,
                {
                    provide : ICountryRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(FindCountryService);
        repository = module.get(ICountryRepository);
        mockRepository = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('FindCountryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find country', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});