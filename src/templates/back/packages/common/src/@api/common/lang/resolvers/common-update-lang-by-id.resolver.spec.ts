/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateLangByIdResolver } from './common-update-lang-by-id.resolver';
import { CommonUpdateLangByIdHandler } from '../handlers/common-update-lang-by-id.handler';
import { CommonUpdateLangByIdInput } from '@api/graphql';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonUpdateLangByIdResolver', () =>
{
    let resolver: CommonUpdateLangByIdResolver;
    let handler: CommonUpdateLangByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateLangByIdResolver,
                {
                    provide : CommonUpdateLangByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateLangByIdResolver>(CommonUpdateLangByIdResolver);
        handler = module.get<CommonUpdateLangByIdHandler>(CommonUpdateLangByIdHandler);
    });

    test('CommonUpdateLangByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateLangByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a lang by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await resolver.main(<CommonUpdateLangByIdInput>commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});