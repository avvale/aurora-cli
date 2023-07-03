/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonCreateCountryResolver } from './common-create-country.resolver';
import { CommonCreateCountryHandler } from '../handlers/common-create-country.handler';
import { CommonCreateCountryInput } from '@api/graphql';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

describe('CommonCreateCountryResolver', () =>
{
    let resolver: CommonCreateCountryResolver;
    let handler: CommonCreateCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonCreateCountryResolver,
                {
                    provide : CommonCreateCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateCountryResolver>(CommonCreateCountryResolver);
        handler = module.get<CommonCreateCountryHandler>(CommonCreateCountryHandler);
    });

    test('CommonCreateCountryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateCountryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an country created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await resolver.main(<CommonCreateCountryInput>commonMockCountryData[0])).toBe(commonMockCountryData[0]);
        });
    });
});