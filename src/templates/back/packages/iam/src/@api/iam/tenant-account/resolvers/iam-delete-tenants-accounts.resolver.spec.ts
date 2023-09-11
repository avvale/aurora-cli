/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteTenantsAccountsHandler, IamDeleteTenantsAccountsResolver } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsAccountsResolver', () =>
{
    let resolver: IamDeleteTenantsAccountsResolver;
    let handler: IamDeleteTenantsAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteTenantsAccountsResolver,
                {
                    provide : IamDeleteTenantsAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeleteTenantsAccountsResolver>(IamDeleteTenantsAccountsResolver);
        handler = module.get<IamDeleteTenantsAccountsHandler>(IamDeleteTenantsAccountsHandler);
    });

    test('IamDeleteTenantsAccountsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteTenantsAccountsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an iamMockTenantAccountData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData)));
            expect(await resolver.main()).toBe(iamMockTenantAccountData);
        });
    });
});
