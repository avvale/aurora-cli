/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { CommonDeleteCountryByIdI18nService } from './delete-country-by-id-i18n.service';
import { CommonCountryId } from '../../domain/value-objects';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonICountryI18nRepository } from '../../domain/country-i18n.repository';
import { CommonMockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('DeleteCountryByIdI18nService', () =>
{
    let service: CommonDeleteCountryByIdI18nService;
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
                DeleteCountryByIdI18nService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        findById  : id => { /**/ },
                        update    : item => { /**/ },
                        deleteById: item => { /**/ },
                    },
                },
                {
                    provide : ICountryI18nRepository,
                    useValue: {
                        delete: queryStatement => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteCountryByIdI18nService);
        repository      = module.get(CommonICountryRepository);
        repositoryI18n  = module.get(ICountryI18nRepository);
        mockRepository  = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('DeleteCountryByIdI18nService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete country and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CountryId(countries[0].id)
            )).toBe(undefined);
        });
    });
});