import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamUpsertAccountCommandHandler } from './iam-upsert-account.command-handler';
import { IamUpsertAccountCommand } from './iam-upsert-account.command';
import { IamUpsertAccountService } from './iam-upsert-account.service';

describe('IamUpsertAccountCommandHandler', () =>
{
    let commandHandler: IamUpsertAccountCommandHandler;
    let service: IamUpsertAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertAccountCommandHandler,
                {
                    provide : IamUpsertAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertAccountCommandHandler>(IamUpsertAccountCommandHandler);
        service = module.get<IamUpsertAccountService>(IamUpsertAccountService);
    });

    describe('main', () =>
    {
        test('UpsertAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertAccountCommand(
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
