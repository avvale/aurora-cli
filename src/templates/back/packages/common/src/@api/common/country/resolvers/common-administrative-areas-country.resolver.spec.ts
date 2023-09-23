/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonAdministrativeAreasCountryHandler } from '../handlers/common-administrative-areas-country.handler';
import { CommonAdministrativeAreasCountryResolver } from './common-administrative-areas-country.resolver';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonAdministrativeAreasCountryResolver', () =>
{
    let resolver: CommonAdministrativeAreasCountryResolver;
    let handler: CommonAdministrativeAreasCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonAdministrativeAreasCountryResolver,
                {
                    provide : CommonAdministrativeAreasCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonAdministrativeAreasCountryResolver>(CommonAdministrativeAreasCountryResolver);
        handler = module.get<CommonAdministrativeAreasCountryHandler>(CommonAdministrativeAreasCountryHandler);
    });

    test('CommonAdministrativeAreasCountryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonAdministrativeAreasCountryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});