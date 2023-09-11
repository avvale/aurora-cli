import { IamDeleteTenantAccountByIdCommand, iamMockTenantAccountData } from '@app/iam/tenant-account';
import { IamDeleteTenantAccountByIdCommandHandler } from '@app/iam/tenant-account/application/delete/iam-delete-tenant-account-by-id.command-handler';
import { IamDeleteTenantAccountByIdService } from '@app/iam/tenant-account/application/delete/iam-delete-tenant-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantAccountByIdCommandHandler', () =>
{
    let commandHandler: IamDeleteTenantAccountByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTenantAccountByIdCommandHandler,
                {
                    provide : IamDeleteTenantAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteTenantAccountByIdCommandHandler>(IamDeleteTenantAccountByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantAccountByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteTenantAccountByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteTenantAccountByIdCommand(
                    iamMockTenantAccountData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
