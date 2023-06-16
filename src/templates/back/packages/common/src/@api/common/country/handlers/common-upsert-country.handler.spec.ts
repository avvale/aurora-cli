/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertCountryHandler } from './common-upsert-country.handler';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { CoreAddI18nConstraintService, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

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