import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '@apps/iam/account/infrastructure/seeds/account.seed';
import { UpdateAccountsCommandHandler } from './update-accounts.command-handler';
import { UpdateAccountsCommand } from './update-accounts.command';
import { UpdateAccountsService } from './update-accounts.service';

describe('UpdateAccountsCommandHandler', () =>
{
    let commandHandler: UpdateAccountsCommandHandler;
    let service: UpdateAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccountsCommandHandler,
                {
                    provide : UpdateAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAccountsCommandHandler>(UpdateAccountsCommandHandler);
        service         = module.get<UpdateAccountsService>(UpdateAccountsService);
    });

    describe('main', () =>
    {
        test('UpdateAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accounts updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAccountsCommand(
                    {
                        id: accounts[0].id,
                        type: accounts[0].type,
                        code: accounts[0].code,
                        email: accounts[0].email,
                        isActive: accounts[0].isActive,
                        clientId: accounts[0].clientId,
                        dApplicationCodes: accounts[0].dApplicationCodes,
                        dPermissions: accounts[0].dPermissions,
                        dTenants: accounts[0].dTenants,
                        dScopes: accounts[0].dScopes,
                        data: accounts[0].data,
                        roleIds: accounts[0].roleIds,
                        tenantIds: accounts[0].tenantIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});