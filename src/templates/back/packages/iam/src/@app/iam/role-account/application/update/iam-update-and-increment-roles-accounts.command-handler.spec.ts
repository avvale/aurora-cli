import { iamMockRoleAccountData, IamUpdateAndIncrementRolesAccountsCommand } from '@app/iam/role-account';
import { IamUpdateAndIncrementRolesAccountsCommandHandler } from '@app/iam/role-account/application/update/iam-update-and-increment-roles-accounts.command-handler';
import { IamUpdateAndIncrementRolesAccountsService } from '@app/iam/role-account/application/update/iam-update-and-increment-roles-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementRolesAccountsCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementRolesAccountsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementRolesAccountsCommandHandler,
                {
                    provide : IamUpdateAndIncrementRolesAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementRolesAccountsCommandHandler>(IamUpdateAndIncrementRolesAccountsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementRolesAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an rolesAccounts updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementRolesAccountsCommand(
                    {
                        roleId: iamMockRoleAccountData[0].roleId,
                        accountId: iamMockRoleAccountData[0].accountId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
