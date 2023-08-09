/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonDeleteCountryByIdService } from './common-delete-country-by-id.service';
import { CommonCountryId } from '../../domain/value-objects';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonICountryI18nRepository } from '../../domain/common-country-i18n.repository';
import { CommonMockCountryRepository } from '../../infrastructure/mock/common-mock-country.repository';

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
