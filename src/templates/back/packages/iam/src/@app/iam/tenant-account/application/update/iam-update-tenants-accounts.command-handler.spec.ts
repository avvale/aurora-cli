import {
    iamMockTenantAccountData,
    IamUpdateTenantsAccountsCommand,
} from '@app/iam/tenant-account';
import { IamUpdateTenantsAccountsCommandHandler } from '@app/iam/tenant-account/application/update/iam-update-tenants-accounts.command-handler';
import { IamUpdateTenantsAccountsService } from '@app/iam/tenant-account/application/update/iam-update-tenants-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsAccountsCommandHandler', () => {
    let commandHandler: IamUpdateTenantsAccountsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateTenantsAccountsCommandHandler,
                {
                    provide: IamUpdateTenantsAccountsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamUpdateTenantsAccountsCommandHandler>(
            IamUpdateTenantsAccountsCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateTenantsAccountsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenantsAccounts updated', async () => {
            expect(
                await commandHandler.execute(
                    new IamUpdateTenantsAccountsCommand(
                        {
                            tenantId: iamMockTenantAccountData[0].tenantId,
                            accountId: iamMockTenantAccountData[0].accountId,
                        },
                        {},
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
