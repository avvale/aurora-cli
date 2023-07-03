/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindLangByIdResolver } from './common-find-lang-by-id.resolver';
import { CommonFindLangByIdHandler } from '../handlers/common-find-lang-by-id.handler';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonFindLangByIdResolver', () =>
{
    let resolver: CommonFindLangByIdResolver;
    let handler: CommonFindLangByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindLangByIdResolver,
                {
                    provide : CommonFindLangByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindLangByIdResolver>(CommonFindLangByIdResolver);
        handler = module.get<CommonFindLangByIdHandler>(CommonFindLangByIdHandler);
    });

    test('CommonFindLangByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindLangByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await resolver.main(commonMockLangData[0].id)).toBe(commonMockLangData[0]);
        });
    });
});