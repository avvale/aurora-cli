/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateResourceByIdHandler, CommonUpdateResourceByIdResolver } from '@api/common/resource';
import { CommonUpdateResourceByIdInput } from '@api/graphql';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateResourceByIdResolver', () =>
{
    let resolver: CommonUpdateResourceByIdResolver;
    let handler: CommonUpdateResourceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateResourceByIdResolver,
                {
                    provide : CommonUpdateResourceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateResourceByIdResolver>(CommonUpdateResourceByIdResolver);
        handler = module.get<CommonUpdateResourceByIdHandler>(CommonUpdateResourceByIdHandler);
    });

    test('CommonUpdateResourceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateResourceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a resource by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await resolver.main(<CommonUpdateResourceByIdInput>commonMockResourceData[0])).toBe(commonMockResourceData[0]);
        });
    });
});
