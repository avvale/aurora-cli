/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';
import { DeleteCountryByIdI18NService } from './delete-country-by-id-i18n.service';
import { CountryId } from '../../domain/value-objects';
import { ICountryRepository } from '../../domain/country.repository';
import { ICountryI18NRepository } from '../../domain/country-i18n.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('DeleteCountryByIdI18NService', () =>
{
    let service: DeleteCountryByIdI18NService;
    let repository: ICountryRepository;
    let repositoryI18N: ICountryI18NRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteCountryByIdI18NService,
                MockCountryRepository,
                {
                    provide : ICountryRepository,
                    useValue: {
                        findById  : id => { /**/ },
                        update    : item => { /**/ },
                        deleteById: item => { /**/ },
                    },
                },
                {
                    provide : ICountryI18NRepository,
                    useValue: {
                        delete: queryStatement => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteCountryByIdI18NService);
        repository      = module.get(ICountryRepository);
        repositoryI18N  = module.get(ICountryI18NRepository);
        mockRepository  = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('DeleteCountryByIdI18NService should be defined', () =>
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