/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonDeleteCountryByIdI18nService } from './common-delete-country-by-id-i18n.service';
import { CommonCountryId } from '../../domain/value-objects';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonICountryI18nRepository } from '../../domain/common-country-i18n.repository';
import { CommonMockCountryRepository } from '../../infrastructure/mock/common-mock-country.repository';

describe('DeleteCountryByIdI18nService', () =>
{
    let service: CommonDeleteCountryByIdI18nService;
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
                CommonDeleteCountryByIdI18nService,
                CommonMockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        findById  : () => { /**/ },
                        update    : () => { /**/ },
                        deleteById: () => { /**/ },
                    },
                },
                {
                    provide : CommonICountryI18nRepository,
                    useValue: {
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonDeleteCountryByIdI18nService);
        repository      = module.get(CommonICountryRepository);
        mockRepository  = module.get(CommonMockCountryRepository);
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
            expect(
                await service.main(
                    new CommonCountryId(commonMockCountryData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});