/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTenantByIdHandler, IamDeleteTenantByIdResolver } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantByIdResolver', () =>
{
    let resolver: IamDeleteTenantByIdResolver;
    let handler: IamDeleteTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteTenantByIdResolver,
                {
                    provide : IamDeleteTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeleteTenantByIdResolver>(IamDeleteTenantByIdResolver);
        handler = module.get<IamDeleteTenantByIdHandler>(IamDeleteTenantByIdHandler);
    });

    test('IamDeleteTenantByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(await resolver.main(iamMockTenantData[0].id)).toBe(iamMockTenantData[0]);
        });
    });
});
