/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { CommonDeleteCountryByIdService } from './common-delete-country-by-id.service';
import { CommonCountryId } from '../../domain/value-objects';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('CommonDeleteCountryByIdService', () =>
{
    let service: CommonDeleteCountryByIdService;
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
                DeleteCountryByIdService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
                {
                    provide : ICountryI18nRepository,
                    useValue: {
                        get   : queryStatement => { /**/ },
                        delete: queryStatement => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteCountryByIdService);
        repository = module.get(CommonICountryRepository);
        mockRepository = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('DeleteCountryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete country and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CountryId(countries[0].id),
            )).toBe(undefined);
        });
    });
});