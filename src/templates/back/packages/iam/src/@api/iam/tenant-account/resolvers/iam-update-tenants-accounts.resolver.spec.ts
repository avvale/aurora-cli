/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantsAccountsInput } from '@api/graphql';
import {
    IamUpdateTenantsAccountsHandler,
    IamUpdateTenantsAccountsResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsAccountsResolver', () => {
    let resolver: IamUpdateTenantsAccountsResolver;
    let handler: IamUpdateTenantsAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateTenantsAccountsResolver,
                {
                    provide: IamUpdateTenantsAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateTenantsAccountsResolver>(
            IamUpdateTenantsAccountsResolver,
        );
        handler = module.get<IamUpdateTenantsAccountsHandler>(
            IamUpdateTenantsAccountsHandler,
        );
    });

    test('IamUpdateTenantsAccountsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateTenantsAccountsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a tenantsAccounts updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockTenantAccountData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <IamUpdateTenantsAccountsInput>iamMockTenantAccountData[0],
                ),
            ).toBe(iamMockTenantAccountData[0]);
        });
    });
});
