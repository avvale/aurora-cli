/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonICountryI18nRepository, CommonICountryRepository, CommonMockCountryRepository } from '@app/common/country';
import { CommonDeleteCountriesService } from '@app/common/country/application/delete/common-delete-countries.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountriesService', () =>
{
    let service: CommonDeleteCountriesService;
    let repository: CommonICountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteCountriesService,
                CommonMockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
                {
                    provide : CommonICountryI18nRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteCountriesService);
        repository = module.get(CommonICountryRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteCountriesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete country and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                    {
                        meta: {
                            fallbackLang: {
                                id        : '7c4754e7-3363-48ca-af99-632522226b51',
                                name      : 'English',
                                image     : 'us',
                                iso6392   : 'en',
                                iso6393   : 'eng',
                                ietf      : 'en-US',
                                customCode: null,
                                dir       : 'RTL',
                                sort      : 0,
                                isActive  : true,
                            },
                            contentLanguage: {
                                id        : '7c4754e7-3363-48ca-af99-632522226b51',
                                name      : 'English',
                                image     : 'us',
                                iso6392   : 'en',
                                iso6393   : 'eng',
                                ietf      : 'en-US',
                                customCode: null,
                                dir       : 'RTL',
                                sort      : 0,
                                isActive  : true,
                            },
                        },
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
