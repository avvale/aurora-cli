/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertLangHandler, CommonUpsertLangResolver } from '@api/common/lang';
import { CommonUpdateLangByIdInput } from '@api/graphql';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertLangResolver', () =>
{
    let resolver: CommonUpsertLangResolver;
    let handler: CommonUpsertLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertLangResolver,
                {
                    provide : CommonUpsertLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpsertLangResolver>(CommonUpsertLangResolver);
        handler = module.get<CommonUpsertLangHandler>(CommonUpsertLangHandler);
    });

    test('CommonUpsertLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpsertLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await resolver.main(<CommonUpdateLangByIdInput>commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});
