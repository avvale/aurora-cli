/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonCreateCountriesService } from './common-create-countries.service';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonICountryI18nRepository } from '../../domain/common-country-i18n.repository';
import { CommonMockCountryRepository } from '../../infrastructure/mock/common-mock-country.repository';

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
