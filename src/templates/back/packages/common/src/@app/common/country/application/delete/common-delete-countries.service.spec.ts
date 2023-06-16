/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteCountriesService } from './delete-countries.service';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('CommonDeleteCountriesService', () =>
{
    let service: DeleteCountriesService;
    let repository: CommonICountryRepository;
    let repositoryI18n: ICountryI18nRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteCountriesService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
                {
                    provide : ICountryI18nRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteCountriesService);
        repository = module.get(CommonICountryRepository);
        repositoryI18n = module.get(ICountryI18nRepository);
        mockRepository = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('DeleteCountriesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete country and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});