import { IamDeleteRolesAccountsCommand } from '@app/iam/role-account';
import { IamDeleteRolesAccountsCommandHandler } from '@app/iam/role-account/application/delete/iam-delete-roles-accounts.command-handler';
import { IamDeleteRolesAccountsService } from '@app/iam/role-account/application/delete/iam-delete-roles-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesAccountsCommandHandler', () =>
{
    let commandHandler: IamDeleteRolesAccountsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteRolesAccountsCommandHandler,
                {
                    provide : IamDeleteRolesAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteRolesAccountsCommandHandler>(IamDeleteRolesAccountsCommandHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteRolesAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteRolesAccountsCommand(),
            )).toBe(undefined);
        });
    });
});
