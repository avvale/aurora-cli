/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetCountriesHandler } from './common-get-countries.handler';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { CoreAddI18nConstraintService, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetCountriesHandler', () =>
{
    let handler: CommonGetCountriesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonGetCountriesHandler,
                CoreAddI18nConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_FALLBACK_LANG' ? 'es' : '',
                    },
                },
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) => key === 'common/langs' ? langs : null,
                    },
                },
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonGetCountriesHandler>(CommonGetCountriesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonGetCountriesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetCountriesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a countries', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await handler.main()).toBe(countries);
        });
    });
});