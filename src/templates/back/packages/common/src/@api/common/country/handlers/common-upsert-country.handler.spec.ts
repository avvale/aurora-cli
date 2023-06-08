/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { AddI18nConstraintService, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpsertCountryHandler } from './common-upsert-country.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonUpsertCountryHandler', () =>
{
    let handler: CommonUpsertCountryHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonUpsertCountryHandler,
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

        handler = module.get<CommonUpsertCountryHandler>(CommonUpsertCountryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonUpsertCountryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an country upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await handler.main(countries[0])).toBe(countries[0]);
        });
    });
});