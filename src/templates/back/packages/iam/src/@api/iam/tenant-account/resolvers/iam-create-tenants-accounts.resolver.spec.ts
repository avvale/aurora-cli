import { IamCreateTenantAccountInput } from '@api/graphql';
import {
    IamCreateTenantsAccountsHandler,
    IamCreateTenantsAccountsResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsAccountsResolver', () => {
    let resolver: IamCreateTenantsAccountsResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsAccountsResolver,
                {
                    provide: IamCreateTenantsAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateTenantsAccountsResolver>(
            IamCreateTenantsAccountsResolver,
        );
    });

    test('IamCreateTenantsAccountsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamCreateTenantsAccountsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an tenantsAccounts created', async () => {
            expect(
                await resolver.main(
                    <IamCreateTenantAccountInput[]>iamMockTenantAccountData,
                ),
            ).toBe(undefined);
        });
    });
});
