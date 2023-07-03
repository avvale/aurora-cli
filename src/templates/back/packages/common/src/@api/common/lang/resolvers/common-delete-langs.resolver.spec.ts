/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteLangsResolver } from './common-delete-langs.resolver';
import { CommonDeleteLangsHandler } from '../handlers/common-delete-langs.handler';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonDeleteLangsResolver', () =>
{
    let resolver: CommonDeleteLangsResolver;
    let handler: CommonDeleteLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteLangsResolver,
                {
                    provide : CommonDeleteLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteLangsResolver>(CommonDeleteLangsResolver);
        handler = module.get<CommonDeleteLangsHandler>(CommonDeleteLangsHandler);
    });

    test('CommonDeleteLangsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteLangsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an commonMockLangData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData)));
            expect(await resolver.main()).toBe(commonMockLangData);
        });
    });
});