/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateLangsResolver } from './common-update-langs.resolver';
import { CommonUpdateLangsHandler } from '../handlers/common-update-langs.handler';
import { CommonUpdateLangsInput } from '@api/graphql';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonUpdateLangsResolver', () =>
{
    let resolver: CommonUpdateLangsResolver;
    let handler: CommonUpdateLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateLangsResolver,
                {
                    provide : CommonUpdateLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateLangsResolver>(CommonUpdateLangsResolver);
        handler = module.get<CommonUpdateLangsHandler>(CommonUpdateLangsHandler);
    });

    test('CommonUpdateLangsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateLangsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a langs updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await resolver.main(<CommonUpdateLangsInput>commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});