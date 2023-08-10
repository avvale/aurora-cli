import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamUpdateAccountByIdCommandHandler } from './iam-update-account-by-id.command-handler';
import { IamUpdateAccountByIdCommand } from './iam-update-account-by-id.command';
import { IamUpdateAccountByIdService } from './iam-update-account-by-id.service';

describe('IamUpdateAccountByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateAccountByIdCommandHandler;
    let service: IamUpdateAccountByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAccountByIdCommandHandler,
                {
                    provide : IamUpdateAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAccountByIdCommandHandler>(IamUpdateAccountByIdCommandHandler);
        service = module.get<IamUpdateAccountByIdService>(IamUpdateAccountByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAccountByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateAccountByIdCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
