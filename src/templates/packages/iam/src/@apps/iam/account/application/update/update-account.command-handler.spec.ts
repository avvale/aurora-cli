import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '../../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { UpdateAccountCommandHandler } from './update-account.command-handler';
import { UpdateAccountCommand } from './update-account.command';
import { UpdateAccountService } from './update-account.service';

describe('UpdateAccountCommandHandler', () =>
{
    let commandHandler: UpdateAccountCommandHandler;
    let service: UpdateAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccountCommandHandler,
                {
                    provide : UpdateAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdateAccountCommandHandler>(UpdateAccountCommandHandler);
        service         = module.get<UpdateAccountService>(UpdateAccountService);
    });

    describe('main', () =>
    {
        test('UpdateAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAccountCommand(
                    {
                        id: accounts[0].id,
                        type: accounts[0].type,
                        email: accounts[0].email,
                        isActive: accounts[0].isActive,
                        clientId: accounts[0].clientId,
                        dApplicationCodes: accounts[0].dApplicationCodes,
                        dPermissions: accounts[0].dPermissions,
                        dTenants: accounts[0].dTenants,
                        data: accounts[0].data,
                        roleIds: accounts[0].roleIds,
                        tenantIds: accounts[0].tenantIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});