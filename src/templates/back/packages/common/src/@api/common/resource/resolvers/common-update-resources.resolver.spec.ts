/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateResourcesHandler, CommonUpdateResourcesResolver } from '@api/common/resource';
import { CommonUpdateResourcesInput } from '@api/graphql';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateResourcesResolver', () =>
{
    let resolver: CommonUpdateResourcesResolver;
    let handler: CommonUpdateResourcesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateResourcesResolver,
                {
                    provide : CommonUpdateResourcesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateResourcesResolver>(CommonUpdateResourcesResolver);
        handler = module.get<CommonUpdateResourcesHandler>(CommonUpdateResourcesHandler);
    });

    test('CommonUpdateResourcesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateResourcesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a resources updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await resolver.main(<CommonUpdateResourcesInput>commonMockResourceData[0])).toBe(commonMockResourceData[0]);
        });
    });
});
