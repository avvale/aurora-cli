import { iamMockRoleAccountData, IamUpsertRoleAccountCommand } from '@app/iam/role-account';
import { IamUpsertRoleAccountCommandHandler } from '@app/iam/role-account/application/upsert/iam-upsert-role-account.command-handler';
import { IamUpsertRoleAccountService } from '@app/iam/role-account/application/upsert/iam-upsert-role-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleAccountCommandHandler', () =>
{
    let commandHandler: IamUpsertRoleAccountCommandHandler;
    let service: IamUpsertRoleAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertRoleAccountCommandHandler,
                {
                    provide : IamUpsertRoleAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertRoleAccountCommandHandler>(IamUpsertRoleAccountCommandHandler);
        service = module.get<IamUpsertRoleAccountService>(IamUpsertRoleAccountService);
    });

    describe('main', () =>
    {
        test('UpsertRoleAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertRoleAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertRoleAccountCommand(
                    {
                        roleId: iamMockRoleAccountData[0].roleId,
                        accountId: iamMockRoleAccountData[0].accountId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
