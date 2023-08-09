/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateLangHandler, CommonCreateLangResolver } from '@api/common/lang';
import { CommonCreateLangInput } from '@api/graphql';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangResolver', () =>
{
    let resolver: CommonCreateLangResolver;
    let handler: CommonCreateLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateLangResolver,
                {
                    provide : CommonCreateLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateLangResolver>(CommonCreateLangResolver);
        handler = module.get<CommonCreateLangHandler>(CommonCreateLangHandler);
    });

    test('CommonCreateLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await resolver.main(<CommonCreateLangInput>commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});
