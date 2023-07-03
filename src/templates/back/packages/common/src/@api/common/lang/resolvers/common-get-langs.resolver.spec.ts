/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetLangsResolver } from './common-get-langs.resolver';
import { CommonGetLangsHandler } from '../handlers/common-get-langs.handler';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonGetLangsResolver', () =>
{
    let resolver: CommonGetLangsResolver;
    let handler: CommonGetLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetLangsResolver,
                {
                    provide : CommonGetLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonGetLangsResolver>(CommonGetLangsResolver);
        handler = module.get<CommonGetLangsHandler>(CommonGetLangsHandler);
    });

    test('CommonGetLangsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetLangsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a commonMockLangData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData)));
            expect(await resolver.main()).toBe(commonMockLangData);
        });
    });
});