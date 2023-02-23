import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';
import { CreateAccountCommandHandler } from './create-account.command-handler';
import { CreateAccountCommand } from './create-account.command';
import { CreateAccountService } from './create-account.service';

describe('CreateAccountCommandHandler', () =>
{
    let commandHandler: CreateAccountCommandHandler;
    let service: CreateAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccountCommandHandler,
                {
                    provide : CreateAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateAccountCommandHandler>(CreateAccountCommandHandler);
        service         = module.get<CreateAccountService>(CreateAccountService);
    });

    describe('main', () =>
    {
        test('CreateAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAccountCommand(
                    {
                        id               : accounts[0].id,
                        type             : accounts[0].type,
                        code             : accounts[0].code,
                        email            : accounts[0].email,
                        isActive         : accounts[0].isActive,
                        clientId         : accounts[0].clientId,
                        scopes           : accounts[0].scopes,
                        dApplicationCodes: accounts[0].dApplicationCodes,
                        dPermissions     : accounts[0].dPermissions,
                        meta             : accounts[0].meta,
                        roleIds          : accounts[0].roleIds,
                        tenantIds        : accounts[0].tenantIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});