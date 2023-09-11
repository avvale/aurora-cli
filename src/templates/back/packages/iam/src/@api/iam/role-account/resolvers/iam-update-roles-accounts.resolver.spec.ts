/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRolesAccountsInput } from '@api/graphql';
import { IamUpdateRolesAccountsHandler, IamUpdateRolesAccountsResolver } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesAccountsResolver', () =>
{
    let resolver: IamUpdateRolesAccountsResolver;
    let handler: IamUpdateRolesAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateRolesAccountsResolver,
                {
                    provide : IamUpdateRolesAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateRolesAccountsResolver>(IamUpdateRolesAccountsResolver);
        handler = module.get<IamUpdateRolesAccountsHandler>(IamUpdateRolesAccountsHandler);
    });

    test('IamUpdateRolesAccountsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateRolesAccountsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a rolesAccounts updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(await resolver.main(<IamUpdateRolesAccountsInput>iamMockRoleAccountData[0])).toBe(iamMockRoleAccountData[0]);
        });
    });
});
