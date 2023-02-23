import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';
import { UpsertAccountCommandHandler } from './upsert-account.command-handler';
import { UpsertAccountCommand } from './upsert-account.command';
import { UpsertAccountService } from './upsert-account.service';

describe('UpsertAccountCommandHandler', () =>
{
    let commandHandler: UpsertAccountCommandHandler;
    let service: UpsertAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertAccountCommandHandler,
                {
                    provide : UpsertAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertAccountCommandHandler>(UpsertAccountCommandHandler);
        service         = module.get<UpsertAccountService>(UpsertAccountService);
    });

    describe('main', () =>
    {
        test('UpsertAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertAccountCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});