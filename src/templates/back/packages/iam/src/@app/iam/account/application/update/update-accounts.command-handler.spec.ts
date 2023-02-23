import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';
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
                        scopes: accounts[0].scopes,
                        dApplicationCodes: accounts[0].dApplicationCodes,
                        dPermissions: accounts[0].dPermissions,
                        dTenants: accounts[0].dTenants,
                        meta: accounts[0].meta,
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