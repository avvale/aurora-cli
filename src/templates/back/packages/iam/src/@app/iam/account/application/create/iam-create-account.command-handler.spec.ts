import { IamCreateAccountCommandHandler } from './iam-create-account.command-handler';
import { IamCreateAccountService } from './iam-create-account.service';
import { IamCreateAccountCommand, iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateAccountCommandHandler', () =>
{
    let commandHandler: IamCreateAccountCommandHandler;
    let service: IamCreateAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateAccountCommandHandler,
                {
                    provide : IamCreateAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateAccountCommandHandler>(IamCreateAccountCommandHandler);
        service = module.get<IamCreateAccountService>(IamCreateAccountService);
    });

    describe('main', () =>
    {
        test('CreateAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the IamCreateAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateAccountCommand(
                    {
                        id: iamMockAccountData[0].id,
                        type: iamMockAccountData[0].type,
                        code: iamMockAccountData[0].code,
                        email: iamMockAccountData[0].email,
                        isActive: iamMockAccountData[0].isActive,
                        clientId: iamMockAccountData[0].clientId,
                        scopes: iamMockAccountData[0].scopes,
                        dApplicationCodes: iamMockAccountData[0].dApplicationCodes,
                        dPermissions: iamMockAccountData[0].dPermissions,
                        dTenants: iamMockAccountData[0].dTenants,
                        meta: iamMockAccountData[0].meta,
                        roleIds: iamMockAccountData[0].roleIds,
                        tenantIds: iamMockAccountData[0].tenantIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
