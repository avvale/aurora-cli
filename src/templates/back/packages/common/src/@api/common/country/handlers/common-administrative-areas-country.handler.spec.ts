/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonAdministrativeAreasCountryHandler } from './common-administrative-areas-country.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonAdministrativeAreasCountryHandler', () =>
{
    let handler: CommonAdministrativeAreasCountryHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonAdministrativeAreasCountryHandler,
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

        handler     = module.get<CommonAdministrativeAreasCountryHandler>(CommonAdministrativeAreasCountryHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonAdministrativeAreasCountryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});