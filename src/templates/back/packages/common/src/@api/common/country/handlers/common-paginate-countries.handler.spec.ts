/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { AddI18nConstraintService, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateCountriesHandler } from './common-paginate-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonPaginateCountriesHandler', () =>
{
    let handler: CommonPaginateCountriesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonPaginateCountriesHandler,
                AddI18nConstraintService,
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

        handler = module.get<CommonPaginateCountriesHandler>(CommonPaginateCountriesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonPaginateCountriesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateCountriesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a countries', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: countries.length,
                count: countries.length,
                rows : countries,
            })));
            expect(await handler.main()).toEqual({
                total: countries.length,
                count: countries.length,
                rows : countries,
            });
        });
    });
});