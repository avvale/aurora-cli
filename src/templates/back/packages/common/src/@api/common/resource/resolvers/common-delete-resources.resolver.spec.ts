/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteResourcesHandler, CommonDeleteResourcesResolver } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourcesResolver', () =>
{
    let resolver: CommonDeleteResourcesResolver;
    let handler: CommonDeleteResourcesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteResourcesResolver,
                {
                    provide : CommonDeleteResourcesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteResourcesResolver>(CommonDeleteResourcesResolver);
        handler = module.get<CommonDeleteResourcesHandler>(CommonDeleteResourcesHandler);
    });

    test('CommonDeleteResourcesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteResourcesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an commonMockResourceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData)));
            expect(await resolver.main()).toBe(commonMockResourceData);
        });
    });
});
