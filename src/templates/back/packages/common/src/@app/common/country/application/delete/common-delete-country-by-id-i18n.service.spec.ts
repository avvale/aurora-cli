/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonICountryI18nRepository, CommonICountryRepository, commonMockCountryData, CommonMockCountryRepository } from '@app/common/country';
import { CommonDeleteCountryByIdI18nService } from '@app/common/country/application/delete/common-delete-country-by-id-i18n.service';
import { CommonCountryId } from '@app/common/country/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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