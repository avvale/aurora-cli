import { iamMockRoleAccountData, IamUpdateRoleAccountByIdCommand } from '@app/iam/role-account';
import { IamUpdateRoleAccountByIdCommandHandler } from '@app/iam/role-account/application/update/iam-update-role-account-by-id.command-handler';
import { IamUpdateRoleAccountByIdService } from '@app/iam/role-account/application/update/iam-update-role-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleAccountByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateRoleAccountByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateRoleAccountByIdCommandHandler,
                {
                    provide : IamUpdateRoleAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateRoleAccountByIdCommandHandler>(IamUpdateRoleAccountByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateRoleAccountByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an roleAccount created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateRoleAccountByIdCommand(
                    {
                        roleId: iamMockRoleAccountData[0].roleId,
                        accountId: iamMockRoleAccountData[0].accountId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
