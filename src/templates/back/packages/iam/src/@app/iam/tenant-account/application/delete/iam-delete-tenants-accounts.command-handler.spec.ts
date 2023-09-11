import { IamDeleteTenantsAccountsCommand } from '@app/iam/tenant-account';
import { IamDeleteTenantsAccountsCommandHandler } from '@app/iam/tenant-account/application/delete/iam-delete-tenants-accounts.command-handler';
import { IamDeleteTenantsAccountsService } from '@app/iam/tenant-account/application/delete/iam-delete-tenants-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantsAccountsCommandHandler', () =>
{
    let commandHandler: IamDeleteTenantsAccountsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTenantsAccountsCommandHandler,
                {
                    provide : IamDeleteTenantsAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteTenantsAccountsCommandHandler>(IamDeleteTenantsAccountsCommandHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantsAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteTenantsAccountsCommand(),
            )).toBe(undefined);
        });
    });
});
