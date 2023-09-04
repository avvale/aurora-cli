/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonICountryI18nRepository, CommonICountryRepository, CommonMockCountryRepository } from '@app/common/country';
import { CommonCreateCountriesService } from '@app/common/country/application/create/common-create-countries.service';
import { ConfigService } from '@nestjs/config';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCountriesService', () =>
{
    let service: CommonCreateCountriesService;
    let mockRepository: CommonMockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateCountriesService,
                CommonMockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
                {
                    provide : CommonICountryI18nRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_FALLBACK_LANG' ? 'es' : '',
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateCountriesService);
        mockRepository = module.get(CommonMockCountryRepository);
    });

    describe('main', () =>
    {
        test('CreateCountriesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create countries and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
