/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetTenantsAccountsHandler, IamGetTenantsAccountsResolver } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTenantsAccountsResolver', () =>
{
    let resolver: IamGetTenantsAccountsResolver;
    let handler: IamGetTenantsAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetTenantsAccountsResolver,
                {
                    provide : IamGetTenantsAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamGetTenantsAccountsResolver>(IamGetTenantsAccountsResolver);
        handler = module.get<IamGetTenantsAccountsHandler>(IamGetTenantsAccountsHandler);
    });

    test('IamGetTenantsAccountsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetTenantsAccountsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a iamMockTenantAccountData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData)));
            expect(await resolver.main()).toBe(iamMockTenantAccountData);
        });
    });
});
