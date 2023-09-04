/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonICountryI18nRepository, CommonICountryRepository, commonMockCountryData, CommonMockCountryRepository } from '@app/common/country';
import { CommonDeleteCountryByIdService } from '@app/common/country/application/delete/common-delete-country-by-id.service';
import { CommonCountryId } from '@app/common/country/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountryByIdService', () =>
{
    let service: CommonDeleteCountryByIdService;
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
                CommonDeleteCountryByIdService,
                CommonMockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                        update    : () => { /**/ },
                    },
                },
                {
                    provide : CommonICountryI18nRepository,
                    useValue: {
                        get   : queryStatement => { /**/ },
                        delete: queryStatement => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteCountryByIdService);
        repository = module.get(CommonICountryRepository);
        mockRepository = module.get(CommonMockCountryRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteCountryByIdService should be defined', () =>
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
